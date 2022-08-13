'use strict'

function onInit() {
    initCanvas()
    renderGallery()
    renderKeywordsList()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.meme-gallery')
    const strHTML = imgs.map((img) => {
        return `<img class="gallery-image" src="${img.url}" onclick="onImgSelect(${img.id})"></img>`
    })

    elGallery.innerHTML = strHTML.join('')
}

function onShuffleMeme() {
    onImgSelect(getRandomInt(1, 18))
}

function onClickGallery() {
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.add('none')
    elMemeEditor.classList.remove('flex')
    const elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.add('flex')
    elGallery.classList.remove('none')
    onSelectNav('gallery', 'memes')
    const elSearchBar = document.querySelector('.search-bar-keywords-container')
    elSearchBar.classList.add('flex')
    elSearchBar.classList.remove('none')
}

function onImgSelect(imgId) {
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.remove('none')
    elMemeEditor.classList.add('flex')
    const elGallery = document.querySelector('.meme-gallery')
    elGallery.classList.add('none')
    setImg(imgId)
    resizeCanvas()
    renderMeme()
    onSelectNav('memes', 'gallery')
    const elSearchBar = document.querySelector('.search-bar-keywords-container')
    elSearchBar.classList.add('none')
    elSearchBar.classList.remove('flex')
}

function onSelectNav(nav, prevNav) {
    document.querySelector(`.${prevNav}`).classList.remove('nav-text-selected')
    document.querySelector(`.${prevNav}`).classList.add('nav-text')
    document.querySelector(`.${nav}`).classList.remove('nav-text')
    document.querySelector(`.${nav}`).classList.add('nav-text-selected')
    document
        .querySelector(`.${prevNav}-container`)
        .classList.remove(`nav-selected`)
    document.querySelector(`.${nav}-container`).classList.add('nav-selected')
}

function galleryFilter(elInput) {
    setImgFilterBy(elInput.value)
    renderGallery()
}

function onSetImgFilter(filterBy, elWord) {
    if (!filterBy) {
        filterBy = elWord.innerText
        setKeywordsValue(elWord.innerText)
    }
    setImgFilterBy(filterBy)
    renderGallery()
    renderKeywordsList()
}

function renderKeywordsList() {
    const keywords = getKeywords()
    let strHTML

    if (showMore) {
        for (let i = 0; i < 3; i++) {
            let keywordsTotalValue = 0
            keywords
                .slice(i * 7, (i + 1) * 7)
                .forEach((keyword) => (keywordsTotalValue += keyword.value))
            strHTML = keywords.map(
                (keyword) => `
    <li style="font-size: ${
        (keyword.value * 6) / keywordsTotalValue
    }em;" onclick="onSetImgFilter(undefined, this)">${
                    keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1)
                }</li>
    `
            )
        }
        document.querySelector('.searched-key-words').innerHTML = `<ul>${strHTML
            .slice(0, 7)
            .join('')}</ul><ul>${strHTML
            .slice(7, 14)
            .join('')}</ul><ul>${strHTML.slice(14, 21).join('')}</ul>`
    } else {
        let keywordsTotalValue = 0
        keywords.forEach((keyword) => (keywordsTotalValue += keyword.value))
        strHTML = keywords.map(
            (keyword) => `
    <li style="font-size: ${
        (keyword.value * 10) / keywordsTotalValue
    }em;" onclick="onSetImgFilter(undefined, this)">${
                keyword.name.charAt(0).toUpperCase() + keyword.name.slice(1)
            }</li>
    `
        )
        document.querySelector(
            '.searched-key-words'
        ).innerHTML = `<ul>${strHTML.join('')}</ul>`
    }
}
