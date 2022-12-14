'use strict';

let gImgURL;

function uploadImg(isShare = false) {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg');

    function onSuccess(uploadedImgUrl) {
        gImgURL = uploadedImgUrl;

        if (isShare)
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`, '_blank');
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl);

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData,
    })
        .then(res => res.text())
        .then(url => {
            onSuccess(url);
        })
        .catch(err => {});
}

function getImgURL() {
    return gImgURL;
}
