export function indexHtml(error?:string, username?:string, gameRoom?:string) {
	return /*html*/`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Chat!</title>
		<link href="style.css" rel="stylesheet" />
		<script>
			window.onload = () => {
				const usernameEl = document.getElementsByName("username")?.[0]
				const gameRoomEl = document.getElementsByName("gameRoom")?.[0]
				if(!usernameEl?.value){
					usernameEl.value = localStorage.getItem("username") ?? ""
				}
				if(!gameRoomEl?.value){
					gameRoomEl.value = location.pathname.substring(1)
				}
			}
		</script>
	</head>
	<body>
	<form action="/" method="POST">
			<h1>Dungeons & Dragons</h1>
			<input type="text" name="username" placeholder="Username" ${username?"value="+username:""} />
			<input type="text" name="gameRoom" placeholder="Game room" ${gameRoom?"value="+gameRoom:""} />
			${error?"<p>"+error+"</p>":""}
			<input type="submit" name="join" value="Join"/>
			<input type="submit" name="join" value="Create"/>
		</form>
	</body>
</html>`;
	
}
