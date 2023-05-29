let FREQUENCY;
let SPEED;

const DESCENDING_PARAMETER = 0.5
const START_X = 82
const START_Y = 101
const END_DROP_Y = 137
const SPEED_WAVES = 0.2
const SEQUENCE_MOVE_WAVES = 10
let SVG;
let wavesMovedToContainer1 = []
let wavesMovedToContainer2 = []
let wavesContainer = []

let expirienceTime
let passedTime = 0
let countOfDrops = 0
let countOfDropsResult


function scaleBar(bar, height, yPos ) {
    bar.setAttribute("height", height - DESCENDING_PARAMETER);
    bar.setAttribute("y", yPos + DESCENDING_PARAMETER);

    createAndMoveDrop();
}
//*********************DROP ANIMATION************************************//
function moveDrop(drop, posY,){
    drop.setAttribute('cy', posY+1)
    const newPosY =  Number(drop.getAttribute('cy'))
    if(newPosY > END_DROP_Y){
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
    wave1.setAttribute('id', `wave_right_${crypto.randomUUID()}`)
    createWavesAttributes(wave1, wavesMovedToContainer1)

    var wave2 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    wave2.setAttribute('id', `wave_left_${crypto.randomUUID()}`)
    createWavesAttributes(wave2, wavesMovedToContainer2)

    const posWave1X =  Number(wave1.getAttribute('cx'))
    const posWave2X =  Number(wave2.getAttribute('cx'))
    moveWaves(wave1, wave2, posWave1X, posWave2X)
}

function createWavesAttributes(wave, wavesMovedToContainer ){
    wave.setAttribute('r', 1)
    wave.setAttribute('cx', START_X)
    wave.setAttribute('cy', END_DROP_Y)
    wave.setAttribute('fill', '#00c9df')
    wavesMovedToContainer.push(wave)
    wavesContainer.push(wave)
    SVG.appendChild(wave)
}

function moveWaves(wave1, wave2, posWave1X, posWave2X){
    wave1.setAttribute('cx', posWave1X + SPEED_WAVES)
    wave2.setAttribute('cx', posWave2X - SPEED_WAVES)
    const newWave1PosX =  Number(wave1.getAttribute('cx'))
    const newWave2PosX =  Number(wave2.getAttribute('cx'))
    if(newWave1PosX > 155){
        wavesMovedToContainer1 = removeWaveFromContainer(wave1, wavesMovedToContainer1)
        wavesMovedToContainer2 = removeWaveFromContainer(wave2, wavesMovedToContainer2)
        moveBackWaves(wave1, wave2, newWave1PosX, newWave2PosX)
        return;
    }
    setTimeout(() => {moveWaves(wave1, wave2, newWave1PosX, newWave2PosX)}, SEQUENCE_MOVE_WAVES)
}

function moveBackWaves(wave1, wave2, posWave1X, posWave2X) {
    wave1.setAttribute('cx', posWave1X - SPEED_WAVES)
    wave2.setAttribute('cx', posWave2X + SPEED_WAVES)
    const newWave1PosX = Number(wave1.getAttribute('cx'))
    const newWave2PosX = Number(wave2.getAttribute('cx'))

    higlightWaves(wave1, wavesMovedToContainer1)
    higlightWaves(wave2, wavesMovedToContainer2)

    if (newWave1PosX < 125) {
        wavesContainer = removeWaveFromContainer(wave1, wavesContainer)
        SVG.removeChild(wave1)
        wavesContainer = removeWaveFromContainer(wave2, wavesContainer)
        SVG.removeChild(wave2)
        if(wavesContainer.length === 0){
            passedTime = 0;
            //console.log('countOfDrops: ', countOfDrops)
            //countOfDropsResult.innerHTML = countOfDrops
            document.getElementById('dropFrequency').innerHTML = FREQUENCY
            //console.log('countOfDropsResult: ', countOfDropsResult.innerHTML)
        }
        return;
    }
    setTimeout(() => {
        moveBackWaves(wave1, wave2, newWave1PosX, newWave2PosX)
    }, SEQUENCE_MOVE_WAVES)
}

function higlightWaves(movedWave, movedWaveContainer){
    let x = Number(movedWave.getAttribute('cx'))
    for(let i = 0; i < movedWaveContainer.length; i++){
        let wave = movedWaveContainer[i];

        if( x >= (Number(wave.getAttribute('cx')) - 1) && x <= (Number(wave.getAttribute('cx')) + 1) ){
            movedWave.setAttribute('fill', '#ff5555')
            movedWave.setAttribute('r', 1.3)
            setTimeout(() => {
                movedWave.setAttribute('fill', '#00c9df')
                movedWave.setAttribute('r', 1)
            }, 100)
        }
    }
}

function removeWaveFromContainer(wave, wavesContainer) {
    return wavesContainer.filter((item) => {
        return item.getAttribute('id') !== wave.getAttribute('id')
    })
}
//*********************END WAVE ANIMATION************************************//


function scaleBarByFrequency (bar) {
    const barHeight = bar.getAttribute('height')
    const barYPos = Number(bar.getAttribute('y'))
    passedTime += SPEED;
    if(passedTime <= expirienceTime) {
        scaleBar(bar, barHeight, barYPos);
        countOfDrops--;
    }else{
        return;
    }
    setTimeout(() => {scaleBarByFrequency(bar)}, SPEED)
}

/*function startTimer() {
    expirienceTime -=1
    if(expirienceTime === 0) {
        return;
    }
    setTimeout(() => {startTimer()}, 1000)
}*/

export const calculationBar = () => {
    SVG = document.getElementById('interpolationArea')
    const bar  = document.getElementById('bar').querySelector('rect')
    expirienceTime = document.getElementById('expirienceTimer').value * 1000
    //countOfDropsResult = document.getElementById('countOfDrops')
    countOfDrops = document.getElementById('countOfDrops').value
    console.log('countOfDrops: ', countOfDrops);
    //FREQUENCY =  document.getElementById('dropFrequency').value
    FREQUENCY = countOfDrops/expirienceTime * 1000
    console.log('FREQUENCY: ', FREQUENCY)
    SPEED = Math.round(1000/ FREQUENCY);

    scaleBarByFrequency(bar)
    //startTimer()
}
