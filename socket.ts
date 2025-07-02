const rooms:Map<string, Map<string, WebSocket>> = new Map()

export function check(username:string|undefined|null, roomname:string|undefined|null, create:boolean):[false, string] | [true]{
    if(!roomname || !username){
        return [false, `No room or username!`]
    }
    
    if(create){
        if(roomname && rooms.has(roomname)){
            return [false, `Room already exists (${roomname})`]
        }else{
            rooms.set(roomname, new Map())
            console.log(`created: ${roomname}`)
            return [true]
        }
    }

    if(!rooms.has(roomname)){
        return [false, `Room not found (${roomname})`]
    }else if(rooms.get(roomname)?.has(username)){
        return [false, `Room (${roomname}) already has that username (${username})`]
    }else{
        return [true]
    }
}

export function handleWs(socket:WebSocket, username:string, roomname:string) {
	rooms.get(roomname!)?.set(username!, socket)
	console.log(`Client with username ${username} joined room ${roomname}.`)

	socket.onopen = () => {

	}
	socket.onmessage = (event) => {
		if(event.data === "debug!"){
			console.log(rooms)
		}else{
            for(const [other, socket] of rooms.get(roomname)?.entries() ?? []){  
                if(other !== username){
                    socket.send(username+": "+event.data)
                }     
            }
        }
	}
	socket.onclose = () => {
		if(rooms.get(roomname)?.has(username)){
			console.log(`Client with username ${username} disconnected.`)
			rooms.get(roomname)?.delete(username)
			if((rooms.get(roomname)?.size ?? 0) < 1){
				console.log(`Room ${roomname} removed.`)
				rooms.delete(roomname)
			}
		}
	}

	socket.onerror = (error) => {
		console.error("Error:", error)
	}
}
