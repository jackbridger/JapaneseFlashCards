const japanesePhraseContainerHTML = document.getElementById('circle-area__body__front');
const englishPhraseContainerHTML = document.getElementById('circle-area__body__back');
const flipCardButtonHTML = document.getElementById('btn-flip');
const progressButtonsHTML = document.getElementById('btn-progress-container');
const circleContainerHTML = document.getElementById('circle-area__body');
const btnBadHTML = document.getElementById('btn-bad');
const btnOkHTML = document.getElementById('btn-ok');
const btnGoodHTML = document.getElementById('btn-good');
const btnGreatHTML = document.getElementById('btn-great');

// initially visible
let frontJapaneseCardVisible = true;
// Each card starts in the first pile untested, it then moves into either bad, good, ok or great.
// Organised from left to right
const phraseProgressPiles = [[],[],[],[],[]];
phraseJSON.forEach((phrase, index) => {
    phraseProgressPiles[0].push(index);
}) 
// Initially, we go through the untested set of cards. This value corresponds to the 
// lowest progress pile which contains a number(s).
let lowestProgressPile = 0;
// Declare the audio so that is global within script.js.
let japaneseAudioRecording;
// Updates HTML with next phrase and audio. Also adds a click event to play pause audio 
const updateCurrentPhraseAndAudioHTML = () => {
    
    // Update the current flashcard app
    helper.updateTextOnFlashcard(phraseProgressPiles, lowestProgressPile);

    japaneseAudioRecording = new Audio(phraseJSON[phraseProgressPiles[lowestProgressPile][0]].audioLink);
    document.getElementById('audio-link').addEventListener('click',() => {
        helper.toggleAudio(japaneseAudioRecording);
    } 
    );
    document.getElementById('progress-bar').style.width = helper.progressBarWidth(phraseProgressPiles);
}
// HTML elems of front (japanese) and back (english) of the card. And the flip button.
helper.toggleVisibility(progressButtonsHTML, flipCardButtonHTML);
// Hides/displays front or back of the flashcard when flip is pressed. 
flipCard = () => {
    if (frontJapaneseCardVisible) {
        helper.toggleCssClass(circleContainerHTML, 'unflip-circle', 'flip-circle');
        helper.toggleVisibility(flipCardButtonHTML, progressButtonsHTML);
        if (!japaneseAudioRecording.paused) {
            japaneseAudioRecording.pause();
        }
        frontJapaneseCardVisible = false;
    }
    else {
        helper.toggleCssClass(circleContainerHTML, 'flip-circle', 'unflip-circle');
        helper.toggleVisibility(progressButtonsHTML, flipCardButtonHTML);
        frontJapaneseCardVisible = true;
    }
    helper.toggleCssClass(englishPhraseContainerHTML,'flip-unshadow', 'flip-shadow');
    helper.toggleCssClass(japanesePhraseContainerHTML,'flip-unshadow', 'flip-shadow');

    setTimeout(() => {
        helper.toggleCssClass(englishPhraseContainerHTML,'flip-shadow', 'flip-unshadow');
        helper.toggleCssClass(japanesePhraseContainerHTML,'flip-shadow', 'flip-unshadow');
    }, 1500);
};
flipCardButtonHTML.addEventListener('click', flipCard);

// Allocate the tested card to its new progressPile, 
// Update the current phrase HTML
// Update the progress count HTML 
// Flip the card from back to front. 
const progressCheck = (buttonPressed) => {
    let current = phraseProgressPiles[lowestProgressPile].shift();
    switch (buttonPressed) {
        case 'bad':
            phraseProgressPiles[1].push(current);
        case 'ok':
            phraseProgressPiles[2].push(current);  
        case 'good':
            phraseProgressPiles[3].push(current); 
        case 'great':
            phraseProgressPiles[4].push(current);
            if (phraseProgressPiles[4].length === phraseJSON.length) {
                endCredits();
            }
    }
    // Find the lowest level of confidence pile
    lowestProgressPile = helper.findLowestProgPile(phraseProgressPiles, lowestProgressPile);

        flipCard();
        setTimeout(() => {updateCurrentPhraseAndAudioHTML();}, 750);
}
// initalise the phrases and counts
(() => {
    updateCurrentPhraseAndAudioHTML();
})();