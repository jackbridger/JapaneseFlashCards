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
    },
    progressBarWidth: (phraseProgressPiles) => {
        let progressPercent = 0;
        let pointsEarned = 0;
        let totalPointsAvailable = 4 * phraseJSON.length;
        for (let i = 1; i < phraseProgressPiles.length; i++ ) {
            pointsEarned += phraseProgressPiles[i].length * i
        }
        progressPercent = (pointsEarned / totalPointsAvailable) * 100;
        return (Math.max(1,progressPercent)) + '%';
    },
    updateProgressBar: () => {
        document.getElementById('progress-bar').style.width = helper.progressBarWidth(phraseProgressPiles);
    }
    ,
    findLowestProgPile: (phraseProgressPiles, lowestProgressPile) => {
        for (let i = 4; i >= 0; i--) {
            if (phraseProgressPiles[i].length > 0){
                lowestProgressPile = i;
            }
        }
        return lowestProgressPile;
    },
    elementsToUpdateNextCard: {
        'english-text': 'englishText',
        'japanese-text': 'japaneseText',
        'english-number': 'cardNumber',
        'japanese-number': 'cardNumber'
    },
    
    returnCurrentCard: (phraseProgressPiles,lowestProgressPile ) => {
        return phraseJSON[phraseProgressPiles[lowestProgressPile][0]]
    }
    ,updateTextOnFlashcard: (currentCard) => {
        Object.keys(helper.elementsToUpdateNextCard).forEach(element => {
            document.getElementById(element).innerText = currentCard[helper.elementsToUpdateNextCard[element]];
        } )
    },
    getCurrentAudio: (currentCard) => {
        return new Audio(currentCard.audioLink);
    },
    placeJapaneseAudio: () => {
        document.getElementById('audio-link').addEventListener('click',() => {
            helper.toggleAudio(japaneseAudioRecording);
        });
    }

}