// const chatLog = document.getElementById("chat-log");
// const messageInput = document.getElementById("message-input");
// const sendButton = document.getElementById("send-button");
// const debugButton = document.getElementById("debug");

if(username){
	localStorage.setItem("username", username)
}
if(gameroom){
	history.pushState({}, null, gameroom)
}

const ws = new WebSocket(`ws://localhost:8000/ws?username=${username}&gameroom=${gameroom}`);

ws.onopen = () => {
	// chatLog.innerHTML += '<p style="color: green;">Connected to chat!</p>';
};

ws.onmessage = (event) => {
	// chatLog.innerHTML += `<p>${event.data}</p>`;
	// chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
};

ws.onclose = (e) => {
	if (e.code >= 4000) {
		console.error(e.code, e.reason);
	}
	// chatLog.innerHTML += '<p style="color: red;">Disconnected from chat.</p>';
};

ws.onerror = (error) => {
	console.log(error);
	location.href = `/error?msg=${encodeURI("Socket error - see console")}`;
};

// sendButton.addEventListener("click", () => {
// 	const message = messageInput.value;
// 	if (message.trim() !== "" && ws && ws.readyState === WebSocket.OPEN) {
// 		ws.send(message);
// 		chatLog.innerHTML += `<p>You: ${message}</p>`; // Display own message immediately
// 		chatLog.scrollTop = chatLog.scrollHeight;
// 		messageInput.value = ""; // Clear input
// 	}
// });

// messageInput.addEventListener("keypress", (event) => {
// 	if (event.key === "Enter") {
// 		sendButton.click();
// 	}
// });

// debugButton.addEventListener("click", (e) => {
// 	console.log(e);
// 	ws.send("debug!");
// });
