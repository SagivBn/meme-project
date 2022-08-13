'use-strict'
let gIsGrabbed = false
let gElCanvas
let gCtx
const gLineStart = {}

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addMouseEvents()
    addTouchEvents()
    setDefaultParams()
}

function addMouseEvents() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchEvents() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function getCanvasHeight() {
    return gElCanvas.height
}

function resizeCanvas() {
    let elCanvas = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvas.offsetWidth
    gElCanvas.height = elCanvas.offsetWidth
    initCanvas()
}

function setDefaultParams() {
    gCtx.font = '40px impact'
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 4
    gLineStart.left = 20
    gLineStart.right = gElCanvas.width - 20
    gLineStart.center = gElCanvas.width / 2
}

function renderMeme() {
    const memeSelected = getMeme()
    const image = new Image()
    image.src = getImageById(memeSelected.selectedImgId).url
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
    memeSelected.lines.forEach((line) => {
        printLine(line, line.pos)
    })
    renderTextInput()
    markSelectedLine()
}

function clickInput() {
    document.querySelector('.opacity').click()
}

function markSelectedLine() {
    gCtx.beginPath()
    const line = getSelectedLine()
    let startingX = 10
    let startingY = line.pos.y - line.size
    let length = line.size * 1.1
    let width = gElCanvas.width - 20
    gCtx.rect(startingX, startingY, width, length)
    gCtx.stroke()
    gCtx.closePath()
}

function printLine(line, { y }) {
    gCtx.textAlign = line.align
    gCtx.font = `${line.size}${gCtx.font.slice(2)} `
    gCtx.fillStyle = line.color
    gCtx.strokeText(line.txt, gLineStart[gCtx.textAlign], y)
    gCtx.fillText(line.txt, gLineStart[gCtx.textAlign], y)
}

function renderTextInput() {
    const elTextInput = document.querySelector('[name=text-input]')
    elTextInput.value = getSelectedLine().txt
}

function onMoveLineByButtons() {
    moveLinesByButtons()
    renderTextInput()
    renderMeme()
}

function onTextAlignChange(direction) {
    onChangeTextAlign(direction)
    renderMeme()
}

function onDeleteLine() {
    deleteSelectedLine()
    renderMeme()
}
function changeText({ value }) {
    changeLineTxt(value)
    renderMeme()
}

function onAddLine() {
    addNewLine()
    renderMeme()
}

function onHeightRowChange(number) {
    changeRowHeight(number)
    renderMeme()
}

function onLineMove() {
    moveLine()
    renderTextInput()
    renderMeme()
}

function onChangeColor({ value }) {
    changeColor(value)
    renderMeme()
}

function onIncreaseFontSize() {
    changeTxtSize(10)
    renderMeme()
}

function onDecreaseFontSize() {
    changeTxtSize(-10)
    renderMeme()
}

function onChangeText({ value }) {
    changeTxtLine(value)
    renderMeme()
}

function changeSelectedLine(newLineIdx) {
    gMeme.selectedLineIdx = newLineIdx
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (checkedLineClicked(pos) === -1) return
    if (selectedLineClicked(pos)) {
        gIsGrabbed = true
        document.body.style.cursor = 'grabbing'
    } else {
        changeSelectedLine(checkedLineClicked(pos))
        renderMeme()
    }
}

function getEvPos(ev) {
    let pos = ev.offsetY
    const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = ev.clientY - 117
    }
    return pos
}

function onMove(ev) {
    if (!gIsGrabbed) return
    const pos = getEvPos(ev)
    moveLine(pos)
    renderMeme()
}

function onUp() {
    gIsGrabbed = false
    document.body.style.cursor = 'unset'
}

function onSaveSelectedMeme() {
    saveSelectedMeme()
}

function prepareMemeForDownload() {
    const selectedMeme = getMeme()
    const image = new Image()
    image.src = getImageById(selectedMeme.selectedImgId).url
    gCtx.drawImage(
        image,
        0,
        0,
        gElCanvas.width,
        gElCanvas.height,
        0,
        0,
        gElCanvas.width,
        gElCanvas.height
    )
    selectedMeme.lines.forEach((line) => {
        printLine(line, line.pos)
    })
}

function onDownloadMeme(elLink) {
    prepareMemeForDownload()
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}

function OnCloseMemeEditor() {
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.remove('show')
}
