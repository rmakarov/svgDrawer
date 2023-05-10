const FREQUENCY = 6;
const SPEED = Math.round(1000 / FREQUENCY);
const DESCENDING_PARAMETER = 0.3
const START_X = 82
const START_Y = 101
const END_DROP_Y = 137
let SVG;

function scaleBar(bar, height, yPos ) {
    bar.setAttribute("height", height - DESCENDING_PARAMETER);
    bar.setAttribute("y", yPos + DESCENDING_PARAMETER);

    createAndMoveDrop()
}
//*********************DROP ANIMATION************************************//
function moveDrop(drop, posY,){
    drop.setAttribute('cy', posY+1)
    const newPosY =  Number(drop.getAttribute('cy'))
    if(newPosY > END_DROP_Y){
        console.log('moveDrop svg: ', SVG);
        SVG.removeChild(drop)
        createAndMoveWaves();
        return;
    }
    setTimeout(() => {moveDrop(drop, newPosY)}, 50)
}

function createAndMoveDrop () {
    var drop = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    drop.setAttribute('r', 1)
    drop.setAttribute('cx', START_X)
    drop.setAttribute('cy', START_Y)
    drop.setAttribute('fill', '#00d2ff')
    SVG.appendChild(drop)
    const posY =  Number(drop.getAttribute('cy'))
    moveDrop(drop, posY);
}
//*********************END DROP ANIMATION************************************//

//*********************WAVE ANIMATION************************************//
function createAndMoveWaves() {
    var wave1 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    wave1.setAttribute('r', 1)
    wave1.setAttribute('cx', START_X)
    wave1.setAttribute('cy', END_DROP_Y)
    wave1.setAttribute('fill', '#00c9df')
    SVG.appendChild(wave1)

    var wave2 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    wave2.setAttribute('r', 1)
    wave2.setAttribute('cx', START_X)
    wave2.setAttribute('cy', END_DROP_Y)
    wave2.setAttribute('fill', '#00c9df')
    SVG.appendChild(wave2)

    const posWave1X =  Number(wave1.getAttribute('cx'))
    const posWave2X =  Number(wave2.getAttribute('cx'))
    moveWaves(wave1, wave2, posWave1X, posWave2X)
}

function moveWaves(wave1, wave2, posWave1X, posWave2X){
    wave1.setAttribute('cx', posWave1X+1)
    wave2.setAttribute('cx', posWave2X-1)
    const newWave1PosX =  Number(wave1.getAttribute('cx'))
    const newWave2PosX =  Number(wave2.getAttribute('cx'))
    if(newWave1PosX > 155){
        moveBackWaves(wave1, wave2, newWave1PosX, newWave2PosX)
        return;
    }
    setTimeout(() => {moveWaves(wave1, wave2, newWave1PosX, newWave2PosX)}, 100)
}

function moveBackWaves(wave1, wave2, posWave1X, posWave2X) {
    wave1.setAttribute('cx', posWave1X - 1)
    wave2.setAttribute('cx', posWave2X + 1)
    const newWave1PosX = Number(wave1.getAttribute('cx'))
    const newWave2PosX = Number(wave2.getAttribute('cx'))
    if (newWave1PosX < 105) {
        SVG.removeChild(wave1)
        SVG.removeChild(wave2)
        return;
    }
    setTimeout(() => {
        moveBackWaves(wave1, wave2, newWave1PosX, newWave2PosX)
    }, 100)
}
//*********************END WAVE ANIMATION************************************//


function scaleBarByFrequency (bar) {
    const barHeight = bar.getAttribute('height')
    const barYPos = Number(bar.getAttribute('y'))

    if(barHeight > 0) {
        scaleBar(bar, barHeight, barYPos);
    }else{
        return;
    }
    setTimeout(() => {scaleBarByFrequency(bar, FREQUENCY)}, SPEED)
}

export const calculationBar = () => {
    SVG = document.getElementById('interpolationArea')
    console.log('SVG: ', SVG)
    const bar  = document.getElementById('bar').querySelector('rect')

    scaleBarByFrequency(bar)
}
