let canvas = document.getElementById("canvas")
let height=canvas.height
let width=canvas.width
let ctx = canvas.getContext("2d")
ctx.fillRect(0, 0, width, height)
const pie = document.getElementById("source");
let lines=[]
let linepoint1 = [0,0]
let linepoint2 = [0,1]
addEventListener("mousedown",(e) =>{
    linepoint1 = [mousex,mousey]
})
addEventListener("mouseup", (e)=>{
    linepoint2 = [mousex, mousey]
    lines.push([linepoint1, linepoint2])
})
let mousex=0
let mousey=0
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        mousex = relativeX
    }
    const relativeY = e.clientY - canvas.offsetLeft;
    if (relativeY > 0 && relativeY < canvas.width) {
        mousey = relativeY
    }
  }
function extend(xmin, ymin, xmax, ymax, x1, y1, x2, y2){
    consty_for_xmin = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1)
    consty_for_xmax = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1)

    constx_for_ymin = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1)
    constx_for_ymax = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1)

    if (ymin <= y_for_xmin <= ymax){
        if (xmin <= x_for_ymax <= xmax){
            return [xmin, y_for_xmin, x_for_ymax, ymax]
        }
        if (xmin <= x_for_ymin <= xmax){
            return [xmin, y_for_xmin, x_for_ymin, ymin]
        }
    }
    if (ymin <= y_for_xmax <= ymax){
        if (xmin <= x_for_ymin <= xmax){
            return [x_for_ymin, ymin, xmax, y_for_xmax]
        }
        if (xmin <= x_for_ymax <= xmax){
            return [x_for_ymax, ymax, xmax, y_for_xmax]
        }
    }

}
function main() {
    
    ctx.drawImage(pie, 0, 0, width, height)
    ctx.beginPath();
    ctx.arc(150, 150, 138, 0, 2 * Math.PI);
    ctx.stroke();
    for (let I = 0; I < lines.length; I++) {
        const line = lines[I];
        const slope = (line[0][1]-line[1][1])/(line[0][0]-line[1][0])
        linestretch=extend(0, 0, width, height, line[0][0],line[0][1], line[1][0], line[1][1])
        
        
        
        
    }
    requestAnimationFrame(main)
}
main()