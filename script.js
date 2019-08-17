let phraseData = {};
// The number of phrases in the JSON

let frontJapaneseCardVisible = true;
// We use these arrays to record how well the user has learned each phrase. 
// The numbers stored in the arrays keys which map to each phrase in JSON object. 
// Initally, all phrases are in the first array - the untested array. 
// The far right right array is where the phrases which are perfected are.
const phraseProgressPiles = [[],[],[],[],[]];

phraseJSON.forEach((phrase, index) => {
    phraseProgressPiles[0].push(index);
}) 

const toggleVisibility = (goHidden, goVisibile) => {
    goHidden.style.visibility = 'hidden';
    goVisibile.style.visibility = 'visible';
}

const toggleCssClass = (element, removeClass, addClass) => {
    element.classList.add(addClass);
    element.classList.remove(removeClass);
}

// Initially, we go through the untested set of cards. This value corresponds to the 
// lowest progress pile which contains a number(s).
let lowestProgressPile = 0;

// Declare the audio so that is global within script.js.
let japaneseAudioRecording;

// Updates HTML with next phrase and audio. Also adds a click event to play pause audio 
const updateCurrentPhraseAndAudioHTML = () => {
    const elementsToUpdate = {
        'english-text': 'englishText',
        'japanese-text': 'japaneseText',
        'english-number': 'cardNumber',
        'japanese-number': 'cardNumber'
    };
    const elementsKeys = Object.keys(elementsToUpdate);

    elementsKeys.forEach(element => {
        document.getElementById(element).innerText = phraseJSON[phraseProgressPiles[lowestProgressPile][0]][elementsToUpdate[element]];
    } )

    japaneseAudioRecording = new Audio(phraseJSON[phraseProgressPiles[lowestProgressPile][0]].audioLink);

    const audioIsPlaying = () => {
        return japaneseAudioRecording
            && japaneseAudioRecording.currentTime > 0
            && !japaneseAudioRecording.paused
            && !japaneseAudioRecording.ended
            && japaneseAudioRecording.readyState > 2;
    }

    document.getElementById('audio-link').addEventListener('click',() => {
        if (audioIsPlaying()) {
            japaneseAudioRecording.pause();
            }
        else {
            japaneseAudioRecording.play();
        }
    } 
    );
    document.getElementById('progress-bar').style.width = (Math.max(1,calculateProgressNumber())) + '%';

}
// HTML elems of front (japanese) and back (english) of the card. And the flip button.
const japanesePhraseContainerHTML = document.getElementById('circle-area__body__front');

const englishPhraseContainerHTML = document.getElementById('circle-area__body__back');


const flipCardButtonHTML = document.getElementById('btn-flip');


const progressButtonsHTML = document.getElementById('btn-progress-container');


toggleVisibility(progressButtonsHTML, flipCardButtonHTML);

const circleContainerHTML = document.getElementById('circle-area__body');




// pressing the buttons
const btnBadHTML = document.getElementById('btn-bad');
const btnOkHTML = document.getElementById('btn-ok');
const btnGoodHTML = document.getElementById('btn-good');
const btnGreatHTML = document.getElementById('btn-great');

// Hides/displays front or back of the flashcard when flip is pressed. 
flipCard = () => {
    if (frontJapaneseCardVisible) {
        toggleCssClass(circleContainerHTML, 'unflip-circle', 'flip-circle');
        toggleVisibility(flipCardButtonHTML, progressButtonsHTML);

        if (!japaneseAudioRecording.paused) {
            japaneseAudioRecording.pause();
        }

        frontJapaneseCardVisible = false;

    }
    else {

        toggleCssClass(circleContainerHTML, 'flip-circle', 'unflip-circle');
        toggleVisibility(progressButtonsHTML, flipCardButtonHTML);

        frontJapaneseCardVisible = true;

        
    }

    toggleCssClass(englishPhraseContainerHTML,'flip-unshadow', 'flip-shadow');
    toggleCssClass(japanesePhraseContainerHTML,'flip-unshadow', 'flip-shadow');


    setTimeout(() => {
        toggleCssClass(englishPhraseContainerHTML,'flip-shadow', 'flip-unshadow');
        toggleCssClass(japanesePhraseContainerHTML,'flip-shadow', 'flip-unshadow');
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