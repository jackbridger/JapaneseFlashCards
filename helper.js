const helper = {
    toggleVisibility: (goHidden, goVisibile) => {
        goHidden.style.visibility = 'hidden';
        goVisibile.style.visibility = 'visible';
    },
    
    toggleCssClass: (element, removeClass, addClass) => {
        element.classList.add(addClass);
        element.classList.remove(removeClass);
    },
    audioIsPlaying: () => {
        return japaneseAudioRecording
            && japaneseAudioRecording.currentTime > 0
            && !japaneseAudioRecording.paused
            && !japaneseAudioRecording.ended
            && japaneseAudioRecording.readyState > 2;
    },
    toggleAudio: (audioElem) => {
        if (helper.audioIsPlaying()) {
            audioElem.pause();
        }
        else {
            audioElem.play();
        }
    }
}