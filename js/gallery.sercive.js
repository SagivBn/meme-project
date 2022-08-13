'use strict'
const gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['trump', 'f-word', 'president'] },
    { id: 2, url: 'images/2.jpg', keywords: ['puppies', 'cute', 'dogs'] },
    {
        id: 3,
        url: 'images/3.jpg',
        keywords: ['baby', 'puppy', 'sleeping', 'adorable']
    },
    { id: 4, url: 'images/4.jpg', keywords: ['kitty', 'sleeping', 'tired'] },
    { id: 5, url: 'images/5.jpg', keywords: ['baby', 'win', 'power'] },
    {
        id: 6,
        url: 'images/6.jpg',
        keywords: ['crazy', 'science-teacher', 'madman']
    },
    { id: 7, url: 'images/7.jpg', keywords: ['surprise', 'baby'] },
    { id: 8, url: 'images/8.jpg', keywords: ['funny', 'clown', 'madman'] },
    { id: 9, url: 'images/9.jpg', keywords: ['baby', 'mean', 'evil'] },
    { id: 10, url: 'images/10.jpg', keywords: ['president', 'laugh', 'obama'] },
    { id: 11, url: 'images/11.jpg', keywords: ['kissing', 'wrestle', 'fight'] },
    { id: 12, url: 'images/12.jpg', keywords: ['pointing', 'blaming'] },
    {
        id: 13,
        url: 'images/13.jpg',
        keywords: ['famous', 'actor', 'successful', 'rich']
    },
    {
        id: 14,
        url: 'images/14.jpg',
        keywords: ['morpheus', 'actor', 'sunglasses']
    },
    { id: 15, url: 'images/15.jpg', keywords: ['lord of the rings', 'king'] },
    { id: 16, url: 'images/16.jpg', keywords: ['laugh', 'star-trek'] },
    {
        id: 17,
        url: 'images/17.jpg',
        keywords: ['putin', 'russia', 'evil', 'dictator']
    },
    { id: 18, url: 'images/18.jpg', keywords: ['buzz', 'toy-story'] }
]

function printAllKeywords() {
    const keyWords = []
    gImgs.forEach((img) => {
        img.keywords.forEach((keyword) => {
            keyWords.push(keyword)
        })
    })
    const uniqKeywords = []
    keyWords.forEach((keyword) => {
        if (!uniqKeywords.find((uniq) => uniq.includes(keyword))) {
            uniqKeywords.push(keyword)
        }
    })
    console.log(uniqKeywords)
}

printAllKeywords()

function getImgs() {
    console.log({ gFilterBy })
    if (gFilterBy !== '') {
        return gImgs.filter((img) =>
            img.keywords.some((keyword) =>
                keyword.includes(gFilterBy.toLocaleLowerCase())
            )
        )
    }
    return gImgs
}

function getImageById(id) {
    return gImgs.find((img) => img.id === id)
}
