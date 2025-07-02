import {handleWs, check} from "./socket.ts"
import { indexHtml } from "./index.html.ts"
import { gameHtml } from "./game.html.ts"
import { serveDir } from "jsr:@std/http/file-server";

const gameJs = Deno.readTextFileSync("./game.js")
const indexCss = Deno.readTextFileSync("./style.css")
const inventoryCss = Deno.readTextFileSync("./inventory.css")

function dev(){
	const [ok, msg1] = check("tim", "dev", true)
	if(ok){
		return new Response(gameHtml("tim", "dev"), {headers: {"content-type": "text/html"}});
	}else{
		const [ok, msg2] = check("tim", "dev", false)
		if(ok){
			return new Response(gameHtml("tim", "dev"), {headers: {"content-type": "text/html"}});
		}else{
			console.log(msg1, msg2)
		}
	}
	return new Response(indexHtml(), {headers: {"content-type": "text/html"}});  		
}

Deno.serve({
	port: 8000,
	handler: async (req) => {
		const url = new URL(req.url)
		if(req.method === "POST" && url.pathname === "/"){
			const params = new URLSearchParams(await req.text())
			const username = params.get("username") ?? undefined
			const roomname = params.get("gameRoom") ?? undefined
			const create = params.get("join") === "Create"
			const [ok, msg] = check(username, roomname, create)
			if(ok){
				return new Response(gameHtml(username, roomname), {headers: {"content-type": "text/html"}});
			}else{
				return new Response(indexHtml(msg, username, roomname), {headers: {"content-type": "text/html"}})
			}
		} else if(url.pathname.startsWith("/assets")) {
			return serveDir(req, {fsRoot: "assets", urlRoot: "assets"});
		} else if(url.pathname === "/game.js"){
			return new Response(gameJs, {headers: {"content-type": "text/javascript"}});
		} else if(url.pathname === "/style.css"){
			return new Response(indexCss, {headers: {"content-type": "text/css"}});
		} else if(url.pathname === "/inventory.css"){
			return new Response(inventoryCss, {headers: {"content-type": "text/css"}});
		} else if(url.pathname === "/error"){
			return new Response(indexHtml(url.searchParams.get("msg") ?? undefined), {headers: {"content-type": "text/html"}});  		
		} else if(url.pathname === "/ws"){
			const roomname = url.searchParams.get("gameroom")
			const username = url.searchParams.get("username")
			const [ok, msg] = check(username, roomname, false)
			if(ok) {
				const { socket, response } = Deno.upgradeWebSocket(req);
			    handleWs(socket, username!, roomname!);
			    return response;
			} else {
				return new Response(`Error: ${msg}`, {status: 409})
			}
		} else {
			return dev()
			// return new Response(indexHtml(), {headers: {"content-type": "text/html"}});  		
		}
	}
});