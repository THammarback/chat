const canvas = document.getElementsByTagName("canvas")[0]
canvas.width = 720;
canvas.height = 480;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#0f0"
ctx.fillRect(0,0,720,480);

function inventoryDragStart(e){
    e.dataTransfer.setData("inventoryIndex", e.target.parentElement.dataset.index);
}
function inventoryDrop(e){
    e.target.appendChild(inventory.children[e.dataTransfer.getData("inventoryIndex")].children[0])
}
function inventoryDragOver(e){
    e.preventDefault()
}
function canvasDrop(e){
    const image = inventory.children[e.dataTransfer.getData("inventoryIndex")].children[0]
    ctx.drawImage(image, e.clientX, e.clientY)
}

window.inventoryDragStart = inventoryDragStart
window.inventoryDrop = inventoryDrop
window.inventoryDragOver = inventoryDragOver
window.canvasDrop = canvasDrop