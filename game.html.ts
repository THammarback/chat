export function gameHtml(username?:string, gameroom?:string){
    return /*html*/`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebSocket unset game</title>
		<style>

		</style>
		<link href="inventory.css" rel="stylesheet" />
        <script>
            const username = "${username}"
            const gameroom = "${gameroom}"
        </script>
		<script type="module" src="/game.js" defer></script>
    </head>
    <body>
		<canvas ondragover="inventoryDragOver(event)" ondrop="canvasDrop(event)"></canvas>
        <div id="inventory">
			<div data-index="0" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"><img ondragstart="inventoryDragStart(event)" src="/assets/RavenFantasyIcons/SeparatedFiles/64x64/fc1.png"/></div>
			<div data-index="1" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="2" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"><img ondragstart="inventoryDragStart(event)" src="/assets/RavenFantasyIcons/SeparatedFiles/64x64/fc2.png"/></div>
			<div data-index="3" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>

			<div data-index="4" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="5" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"><img ondragstart="inventoryDragStart(event)" src="/assets/RavenFantasyIcons/SeparatedFiles/64x64/fc3.png"/></div>
			<div data-index="6" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="7" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>

			<div data-index="8" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="9" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="10" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="11" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"><img ondragstart="inventoryDragStart(event)" src="/assets/RavenFantasyIcons/SeparatedFiles/64x64/fc4.png"/></div>

			<div data-index="12" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="13" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="14" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="15" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>

			<div data-index="16" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"><img ondragstart="inventoryDragStart(event)" src="/assets/RavenFantasyIcons/SeparatedFiles/64x64/fc5.png"/></div>
			<div data-index="17" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="18" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
			<div data-index="19" ondragover="inventoryDragOver(event)" ondrop="inventoryDrop(event)"></div>
		</div>
    </body>
</html>`
}