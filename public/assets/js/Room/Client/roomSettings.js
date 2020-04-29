const utils = require('../../utilities');

function loadRoom(id) {
    window.location.replace(`${window.location.origin}/room/load?id=${id}`);
}

function initCloseCamera(id) {
    // nsSocket.emit('closeCamera', {
    //     peerId: id
    // })

    const htmlToAdd = `
        <?xml version="1.0" encoding="utf-8"?>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M4672.6,435.2L100-4137.4l327.4-327.4L752.6-4790l1061.9,1061.9l1059.6,1059.6l1838.3,6.6l1836.1,6.6l119.5,48.7c287.6,117.2,495.5,331.8,577.4,597.3c37.6,123.9,44.2,205.7,44.2,575.2c0,336.3,6.6,429.2,28.8,420.3c13.3-4.4,356.2-132.7,756.6-283.2c783.1-292,865-311.9,977.8-227.9c132.7,99.5,128.3,33.2,128.3,1690.1c0,1484.4,0,1517.6-44.2,1592.8c-57.5,97.3-174.8,161.5-272.1,146c-37.6-6.6-404.8-134.9-811.9-287.6c-407.1-152.6-745.5-278.7-752.1-278.7c-6.6,0-11.1,92.9-11.1,203.5V1747l1305.2,1305.2L9900,4357.4l-327.4,327.4L9247.4,5010L4672.6,435.2z"/><path d="M2451.6,2972.6c-265.5-33.2-550.8-227.9-676.9-455.7c-128.3-236.7-126.1-216.8-126.1-2064v-1692.3L3750.1,862.1c1157,1154.8,2101.6,2108.2,2101.6,2117.1C5851.7,3003.5,2626.3,2996.9,2451.6,2972.6z"/></g></g>
        </svg>
    `;


    // Pausing Video
    const videoEl = '#myVideo';
    utils.pauseVideo(videoEl);

}

function initIndividualUserActionBtns() {
    const videoContainer = document.querySelector('.video_container');

    // Grabbing All video els
    const videoEls = videoContainer.querySelectorAll('.video_holder');

    videoEls.forEach(videoEl => {
        const toggle_video_btn = videoEl.querySelector('.actions .svg_container[data-btn="toggle_video"]');
        const toggle_audio_btn = videoEl.querySelector('.actions .svg_container[data-btn="toggle_audio"]');

        // Removing Eventlistener if already exists
        toggle_video_btn.removeEventListener('click', toggleVideoHandler);
        toggle_video_btn.addEventListener('click', toggleVideoHandler);

        // Removing Eventlistener if already exists
        toggle_audio_btn.removeEventListener('click', toggleAudioHandler);
        toggle_audio_btn.addEventListener('click', toggleAudioHandler);
    })
}

function toggleVideoHandler() {
    const userId = this.closest('.video_holder').querySelector('video').dataset.peerid;
    console.log('toggling video', userId);
}

function toggleAudioHandler() {
    const userId = this.closest('.video_holder').querySelector('video').dataset.peerid;
    console.log('toggling audio', userId);
}

module.exports = {
    loadRoom,
    initCloseCamera,
    initIndividualUserActionBtns
}