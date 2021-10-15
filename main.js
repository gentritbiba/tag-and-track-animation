let baseAcceleration = 2;
const accelerationFalloff = 0.98;
const lineHeight = 5;

let linesConfig = [
    {
        width: 200,
        acceleration: 1.2,
        color: "cyan",
        height: lineHeight,
        xPos: 0,
        yPos: 0,
        speed: 0
    },
    {
        width: 100,
        acceleration: 2,
        color: "cyan",
        height: lineHeight,
        xPos: 20,
        yPos: 20,
        speed: 0
    }
]

// Comment out this line if you want to have custom line config
linesConfig = genRandomLinesConfig(20);



function randomIntFromInterval(minMax) {
    return Math.floor(Math.random() * (minMax[1] - minMax[0] + 1) + minMax[0])
}

function genRandomLinesConfig(n) {
    const linesSpreadOut = 1.8;
    const height = lineHeight;
    const widthLimits = [30, 100];
    const yPosLimits = [0, height * n * linesSpreadOut];
    const xPosLimits = [0, 100];
    const accelerationLimits = [17, 20];
    const linesConfig = []
    for (let i = 0; i < n; i++) {
        linesConfig.push(
            {
                width: randomIntFromInterval(widthLimits),
                acceleration: randomIntFromInterval(accelerationLimits),
                color: "cyan",
                height: lineHeight,
                xPos: randomIntFromInterval(xPosLimits),
                yPos: randomIntFromInterval(yPosLimits),
                speed: 0
            }
        )
    }
    return linesConfig;
}



function createLine(indx, line) {
    const { width, acceleration, color, height, xPos, yPos } = line
    return $(`
        <span class="singleLine" 
        id="singleLine-${indx}"
        style="
            width:${width}px;
            background:${color}; 
            height:${height}px; 
            transform: translateX(${xPos}px); 
            top: ${yPos}px;
            border-radius:${height / 2}px
            ">
    `)
}

function calcDistance(t) {
    return
}

function updateLine(indx) {
    const { xPos } = linesConfig[indx];
    $("#singleLine-" + indx).css({
        transform: `translateX(${xPos}px)`
    })
}


function step(time) {
    linesConfig.forEach((el, indx) => {
        updateLine(indx);
        el.speed += el.acceleration * baseAcceleration;
        el.xPos += el.speed
        baseAcceleration *= accelerationFalloff
    })
    console.log(1)
    if( time - window.startTime >= 6000 ) {
        return;
      }
    requestAnimationFrame(step)
}

function mountAnimToElement(el){
    const ttLineAnimationWrapper = el;
    ttLineAnimationWrapper.css('height', linesConfig.length * 12)
    linesConfig.forEach((el, indx) => {
        ttLineAnimationWrapper.append(createLine(indx, el));
    })
    window.startTime = performance.now();
    requestAnimationFrame(step);
    
}


$(() => {
   mountAnimToElement($("#tt-line-animation"));
    
})