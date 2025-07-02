import {handleWs, check} from "./socket.ts"
import { indexHtml } from "./index.html.ts"
import { gameHtml } from "./game.html.ts"


const gameJs = Deno.readTextFileSync("./game.js")

Deno.serve({
	port: 8000,
	handler: async (req) => {
		const url = new URL(req.url)
		if(req.method === "POST" && url.pathname === "/"){
			const params = new URLSearchParams(await req.text())
			const username = params.get("username") ?? undefined
			const roomname = params.get("gameRoom") ?? undefined
			const create = params.get("join") === "Create"
			const [ok, msg] = check(roomname, username, create)
			if(ok){
				return new Response(gameHtml(username, roomname), {headers: {"content-type": "text/html"}});
			}else{
				return new Response(indexHtml(msg, username, roomname), {headers: {"content-type": "text/html"}})
			}
		} else if(url.pathname === "/game.js"){
			return new Response(gameJs, {headers: {"content-type": "text/javascript"}});	
		} else if(url.pathname === "/error"){
			return new Response(indexHtml(url.searchParams.get("msg") ?? undefined), {headers: {"content-type": "text/html"}});  		
		} else if(url.pathname === "/ws"){
			const roomname = url.searchParams.get("gameroom")
			const username = url.searchParams.get("username")
			const [ok, msg] = check(roomname, username, false)
			if(ok) {
				const { socket, response } = Deno.upgradeWebSocket(req);
			    handleWs(socket, username!, roomname!);
			    return response;
			} else {
				return new Response(`Error: ${msg}`, {status: 409})
			}
		} else {
			return new Response(indexHtml(), {headers: {"content-type": "text/html"}});  		
		}
	}
});