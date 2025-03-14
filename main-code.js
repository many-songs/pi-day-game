let canvas = document.getElementById("canvas")
let height=canvas.height
let width=canvas.width
let ctx = canvas.getContext("2d")
ctx.fillRect(0, 0, width, height)
const pie = document.getElementById("source");
let cuts=document.getElementById("cuts")
let peices=document.getElementById("peices")
let lines=[]
let extLines=[]
let linepoint1 = [0,0]
let linepoint2 = [0,1]
let drawing=false
let cutCount=0
const pieRadius=138

addEventListener("mousedown",(e) =>{
    linepoint1 = [mousex,mousey]
    drawing=true
})
addEventListener("mouseup", (e)=>{
    drawing=false
    linepoint2 = [mousex, mousey]
    if (checkCollision(linepoint1, linepoint2, 150, 150, pieRadius)){
        lines.push([linepoint1, linepoint2])
        extLines.push(extend(0, 0, width, height, linepoint1[0], linepoint1[1], linepoint2[0], linepoint2[1]))
        cutCount+=1
        cuts.textContent="number of cuts:"+cutCount
        countPeices()
    }
})
let mousex=0
let mousey=0
document.addEventListener("mousemove", mouseMoveHandler, false);

const radSquared=pieRadius**2
let peicesCount=1
function checkCollision(point1, point2, x, y, radius)
    {
        const slope1=(point2[1]-point1[1])/(point2[0]-point1[0])
        const yint1=point1[1]-(point1[0]*slope1)
        const b=-1
        const a=slope1
        const c=yint1
        // Finding the distance of line from center.
        let dist = (Math.abs(a * x + b * y + c)) / 
                        Math.sqrt(a * a + b * b);
       
        // Checking if the distance is less than, 
        // greater than or equal to radius.
        if (radius > dist)
            return true
        else
            return false
            
    }
function countPeices(){
    let outsideIntesectionCount = 0
    
    for (let I = 0; I < lines.length; I++) {
        const line1 = lines[I];
        const slope1=(line1[1][1]-line1[0][1])/(line1[1][0]-line1[0][0])
        const yint1=line1[0][1]-(line1[0][0]*slope1)
        for (let J = 0; J < I; J++) {
            const line2 = lines[J];
            const slope2=(line2[1][1]-line2[0][1])/(line2[1][0]-line2[0][0])
            const yint2=line2[0][1]-(line2[0][0]*slope2)
            const intersectX=(yint2-yint1)/(slope1-slope2)
            const intersectY=slope1*intersectX+yint1
            if((intersectX-150)*(intersectX-150)+(intersectY-150)*(intersectY-150)>=radSquared){
                outsideIntesectionCount+=1
            }
            
        }
    }
    let ideal=((cutCount*cutCount+cutCount+2)/2)
    peicesCount=((cutCount*cutCount+cutCount+2)/2)-outsideIntesectionCount
    peices.textContent=floor((peicesCount/ideal)*100)+"% of a perfect score"

}
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        mousex = relativeX
    }
    const relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 0 && relativeY < canvas.height) {
        mousey = relativeY
    }
  }
function extend(xmin, ymin, xmax, ymax, x1, y1, x2, y2){
    const y_for_xmin = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1)
    const y_for_xmax = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1)

    const x_for_ymin = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1)
    const x_for_ymax = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1)

    if (ymin <= y_for_xmin && y_for_xmin <= ymax
        && ymin <= y_for_xmax && y_for_xmax <= ymax) {
          return [xmin, y_for_xmin, xmax, y_for_xmax];
          
       } else if (ymin <= y_for_xmin && y_for_xmin <= ymax) {
           if (xmin <= x_for_ymax && x_for_ymax <= xmax) {
               return [xmin, y_for_xmin, x_for_ymax, ymax];
               
           }
           else if(xmin <= x_for_ymin && x_for_ymin <= xmax) {
               return [xmin, y_for_xmin, x_for_ymin, ymin];
               
           }
       } else if (ymin <= y_for_xmax && y_for_xmax <= ymax){
           if (xmin <= x_for_ymin && x_for_ymin <= xmax){
               return [x_for_ymin, ymin, xmax, y_for_xmax];
               
           }
           if(xmin <= x_for_ymax && x_for_ymax <= xmax){
               return [x_for_ymax, ymax, xmax, y_for_xmax];
               
           }
       } else if (xmin <= x_for_ymin && x_for_ymin <= xmax
        && xmin <= x_for_ymax && x_for_ymax <= xmax) { 
            return [x_for_ymin, ymin, x_for_ymax, ymax];
            
       }

}
function main() {
    
    ctx.drawImage(pie, 0, 0, width, height)
    ctx.beginPath();
    ctx.arc(150, 150, pieRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    for (let I = 0; I < lines.length; I++) {
        const line = lines[I];
        const extLine = extLines[I]
        ctx.fillRect(line[0][0]-2, line[0][1]-2, 4, 4)
        ctx.fillRect(line[1][0]-2, line[1][1]-2, 4, 4)
        ctx.beginPath()
        ctx.moveTo(extLine[0], extLine[1])
        ctx.lineTo(extLine[2], extLine[3])
        ctx.stroke()
        
        
        
    }
    if(drawing){
        if(linepoint1[0]!=mousex && linepoint1[1]!=mousey){
            tempex=extend(0,0,width, height, linepoint1[0], linepoint1[1], mousex, mousey)
        
            ctx.lineWidth=4
            ctx.beginPath()
            ctx.moveTo(tempex[0], tempex[1])
            ctx.lineTo(tempex[2], tempex[3])
            ctx.stroke()
            ctx.lineWidth=1
        }
    }
    requestAnimationFrame(main)
}
main()