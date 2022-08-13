'use strict'

let gSelectedLine
let gMeme

// let gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'I sometimes eat Falafel',
//             size: 20, margin-top: 50px;
//             align: 'left',
//             color: 'red'
//         }
//     ]
// }

// const linesPos = {
//     firstLine: { x: 20, y: 70 },
//     secondLine: { x: 20, y: 430 },
//     newLine: { x: 20, y: 250 }
// }

let gFilterBy = ''
let showMore = false

const lineSettings = {
    color: 'white',
    size: 30
}

const gKeywords = [
    { name: 'cute', value: 1.5 },
    { name: 'baby', value: 1.4 },
    { name: 'funny', value: 1.2 },
    { name: 'actor', value: 1 },
    { name: 'puppies', value: 0.8 },
    { name: 'funny', value: 0.6 },
    { name: 'president', value: 0.5 },
    { name: 'kitty', value: 0.5 },
    { name: 'power', value: 0.5 },
    { name: 'win', value: 0.5 },
    { name: 'crazy', value: 0.5 },
    { name: 'success', value: 0.5 },
    { name: 'fight', value: 0.5 },
    { name: 'king', value: 0.5 },
    { name: 'rich', value: 0.5 },
    { name: 'clown', value: 0.5 },
    { name: 'putin', value: 0.5 },
    { name: 'puppy', value: 0.5 }
]

function showMoreOrLess() {
    showMore = !showMore
}

function moreKeywords() {
    showMoreOrLess()
    renderKeywordsList()
}

// const gDirections = {
//     left: 20,
//     right: 430,
//     center: 225
// }

function setImgFilterBy(filterBy) {
    gFilterBy = filterBy
}

function getKeywords() {
    if (showMore) {
        return gKeywords
    }
    return gKeywords.slice(0, 7)
}

function setImg(imgId) {
    if (_LoadMemeFromStorage(`meme${imgId}`)) {
        gMeme = loadFromStorage(`meme${imgId}`)
        gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
        return
    }
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: lineSettings.size,
                align: 'left',
                color: lineSettings.color,
                pos: { y: 70 }
            }
        ]
    }
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
    console.log(gMeme)
}

function getMeme() {
    return gMeme
}

function getSelectedLine() {
    return gSelectedLine
}

function onChangeTextAlign(direction) {
    gSelectedLine.align = direction
    renderMeme()
}
function changeTxtSize(number) {
    console.log({ gCurrLine })
    gSelectedLine.size += number
}

function changeColor(color) {
    return (gMeme.lines[gMeme.selectedLineIdx].color = color)
}

function changeTxtSize(number) {
    gMeme.lines[gMeme.selectedLineIdx].size += number
}

function deleteSelectedLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.lines.length === 0) {
        addNewLine()
        gMeme.selectedLineIdx = 0
        gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
        return
    }
    if (gMeme.selectedLineIdx === 0) {
        if ((gMeme.lines.length = 1)) {
            gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
            return
        }
        gMeme.selectedLineIdx++
    } else gMeme.selectedLineIdx--
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
}

function addNewLine() {
    if (gMeme.lines.length >= 5) return
    gMeme.lines.push(_createNewLine())
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
}

function _createNewLine() {
    return {
        txt: '',
        size: lineSettings.size,
        align: 'left',
        color: lineSettings.color,
        pos: { y: getCanvasHeight() / gMeme.lines.length }
    }
}

function shuffleMeme() {
    // gMeme = {
    //     selectedImgId: imgId,
    //     selectedLineIdx: 0,
    //     lines: [
    //         {
    //             txt: '',
    //             size: lineSettings.size,
    //             align: 'left',
    //             color: lineSettings.color,
    //             pos: { y: 70 }
    //         }
    //     ]
    // }
    // gMeme = {
    //     selectedImgId: getRandomInt(1, 18),
    //     selectedLineIdx: 0,
    //     lines: [
    //         {
    //             txt: makeRandomText(getRandomInt(0, 4)),
    //             size: lineSettings.size,
    //             align: 'left',
    //             color: lineSettings.color,
    //             pos: { y: 70 }
    //         }
    //     ]
    // }
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
}

function setLinesHeight() {
    linePos.firstLine = { y: 70 }
    linePos.newLine = { y: getCanvasHeight() / 2 }
}

function selectedLineChange(newLineIdx) {
    gMeme.selectedLineIdx = newLineIdx
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
}

function moveLine(dy) {
    // gMeme.selectedLineIdx++
    // if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    //     gMeme.selectedLineIdx = 0
    // }
    // gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
    gSelectedLine.pos.y = dy
}

function changeRowHeight(number) {
    gSelectedLine.pos.y += number
}

function changeTxtLine(txt) {
    gSelectedLine.txt = txt
}

function checkedLineClicked(clickedPos) {
    return gMeme.lines.findIndex(
        (line) =>
            clickedPos <= line.pos.y && clickedPos >= line.pos.y - line.size
    )
}

function selectedLineClicked(clickedPos) {
    return (
        clickedPos <= gSelectedLine.pos.y &&
        clickedPos >= gSelectedLine.pos.y - gSelectedLine.size
    )
}

function saveSelectedMeme() {
    saveToStorage(`meme${gMeme.selectedImgId}`, gMeme)
}

function _LoadMemeFromStorage(memeName) {
    return loadFromStorage(memeName)
}

function moveLinesByButtons() {
    console.log({ gMeme })
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
        gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
    }
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
}

function setKeywordsValue(keywordName) {
    const keywordIdx = gKeywords.findIndex(
        (keyword) => keyword.name === keywordName.toLowerCase()
    )
    gKeywords[keywordIdx].value += 0.05
}

function setImgFilterBy(filterBy) {
    gFilterBy = filterBy
}
