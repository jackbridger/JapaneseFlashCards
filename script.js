let frontJapaneseCardVisible = true;
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
    const elementsToUpdateNextCard = {
        'english-text': 'englishText',
        'japanese-text': 'japaneseText',
        'english-number': 'cardNumber',
        'japanese-number': 'cardNumber'
    };
    const elementsKeys = Object.keys(elementsToUpdateNextCard);

    elementsKeys.forEach(element => {
        document.getElementById(element).innerText = phraseJSON[phraseProgressPiles[lowestProgressPile][0]][elementsToUpdateNextCard[element]];
    } )

    japaneseAudioRecording = new Audio(phraseJSON[phraseProgressPiles[lowestProgressPile][0]].audioLink);


    document.getElementById('audio-link').addEventListener('click',() => {
        helper.toggleAudio(japaneseAudioRecording);
    } 
    );
    document.getElementById('progress-bar').style.width = (Math.max(1,calculateProgressNumber())) + '%';

}
// HTML elems of front (japanese) and back (english) of the card. And the flip button.
const japanesePhraseContainerHTML = document.getElementById('circle-area__body__front');

const englishPhraseContainerHTML = document.getElementById('circle-area__body__back');


const flipCardButtonHTML = document.getElementById('btn-flip');


const progressButtonsHTML = document.getElementById('btn-progress-container');


helper.toggleVisibility(progressButtonsHTML, flipCardButtonHTML);

const circleContainerHTML = document.getElementById('circle-area__body');




// pressing the buttons
const btnBadHTML = document.getElementById('btn-bad');
const btnOkHTML = document.getElementById('btn-ok');
const btnGoodHTML = document.getElementById('btn-good');
const btnGreatHTML = document.getElementById('btn-great');

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

    if (buttonPressed === 'bad') {
        phraseProgressPiles[1].push(current);
    }
    else if (buttonPressed === 'ok') {
        phraseProgressPiles[2].push(current);    
    }
    else if (buttonPressed === 'good') {
        phraseProgressPiles[3].push(current);   
    }
    else if (buttonPressed === 'great') {
        phraseProgressPiles[4].push(current);
        if (phraseProgressPiles[4].length === phraseJSON.length) {
            endCredits();
        }
    }
    // Find the lowest level of confidence pile
    
    for (let i = 4; i >= 0; i--) {
        if (phraseProgressPiles[i].length > 0){
            lowestProgressPile = i;
        }
    }

        flipCard();
        setTimeout(() => {updateCurrentPhraseAndAudioHTML();}, 750);
        
}

calculateProgressNumber = () => {
    let progressPercent = 0;
    let pointsEarned = 0;
    let totalPointsAvailable = 4 * phraseJSON.length;
    for (let i = 1; i < phraseProgressPiles.length; i++ ) {
        pointsEarned += phraseProgressPiles[i].length * i
    }
    progressPercent = (pointsEarned / totalPointsAvailable) * 100;
    return progressPercent;
}
// This runs when the user completes 'great' on all words.
const endCredits = () => {
    ['page-title','circle-area', 'button-area', 'progress-area'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    })

    document.body.removeAttribute('style');

    const endCreditsHTML = document.getElementById('end-credits');
    const endCreditsContainerHTML = document.getElementById('end-credits-container');
    endCreditsContainerHTML.style.display = 'inline';

    const documentBodyStyle = document.body.style
    documentBodyStyle.backgroundColor = 'black';
    documentBodyStyle.width = '100%';
    documentBodyStyle.height = '100%';
}




// initalise the phrases and counts
(() => {
    updateCurrentPhraseAndAudioHTML();
})();