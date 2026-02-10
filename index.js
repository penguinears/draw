const canvas = document.getElementById("drawing-board");
const ctx = canvas.getContext("2d");

// Proper scaling for sharp lines
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = "#000000";
ctx.lineWidth = 5;

let isDrawing = false;

canvas.addEventListener("mousedown", e => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", e => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

// Toolbar controls
document.getElementById("stroke").addEventListener("input", e => {
    ctx.strokeStyle = e.target.value;
});

document.getElementById("lineWidth").addEventListener("input", e => {
    ctx.lineWidth = e.target.value;
});

document.getElementById("clear").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
