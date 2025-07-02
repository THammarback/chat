export function gameHtml(username?:string, gameroom?:string){
    return /*html*/`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket unset game</title>
    <style>
        body { font-family: sans-serif; margin: 20px; }
        #chat-log { border: 1px solid #ccc; padding: 10px; height: 300px; overflow-y: scroll; margin-bottom: 10px; }
        #message-input { width: calc(100% - 70px); padding: 8px; }
        #send-button { padding: 8px 15px; }
    </style>
    <script>
        const username = "${username}"
        const gameroom = "${gameroom}"
    </script>
    <script type="module" src="/game.js" defer></script>
</head>
<body >
    <h1>Deno WebSocket Chat</h1>
    <div id="chat-log"></div>
    <input type="text" id="message-input" placeholder="Type your message...">
    <button id="send-button">Send</button>
    <button id="debug">debug</button>
</body>
</html>`
}