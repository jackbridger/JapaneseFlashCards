let phraseData = {};

phraseData.phraseJSON = 
// The Japanese, English and audio JSON
{
    1: {
        englishText: 'Good Weather, huh!',
        japaneseText: '今日もいい天気ですね \n \n(Kyōmoītenkidesu ne)',
        audioLink: 'japanese_audio/nice_weather.mp4',
        cardNumber: '01.'
    },
   2: {
        englishText: 'Long Time, No See!',
        japaneseText: '久しぶり！\n \n (Hisashiburi)',
        audioLink: 'japanese_audio/久しぶり.mp3',
        cardNumber: '02.'
    },
    3: {
        englishText: 'See You Later',
        japaneseText: 'じゃまた',
        audioLink: 'japanese_audio/じゃまた.mp3',
        cardNumber: '03.'
    },
    4: {
        englishText: 'Seriously?',
        japaneseText: 'マジで',
        audioLink: 'japanese_audio/マジで.mp3',
        cardNumber: '04.'
    },
    5: {
        englishText: 'No way!',
        japaneseText: 'うそ!',
        audioLink: 'japanese_audio/うそ!.mp3',
        cardNumber: '05.'
    },
    6: {
        englishText: 'Please Excuse Me (for Leaving)',
        japaneseText: '失礼します \n \n (Shitsurei Shimasu)',
        audioLink: 'japanese_audio/失礼します.mp3',
        cardNumber: '06.'
    },
    7: {
        englishText: 'You Must Be Tired or Thanks for Your Hard Work',
        japaneseText: 'お疲れ様でした \n \n (Otsukaresama Deshita)',
        audioLink: 'japanese_audio/お疲れ様でした.mp3',
        cardNumber: '07.'
    }
    ,    
    8: {
        englishText: 'Do you understand?',
        japaneseText: 'わかりますか ',
        audioLink: 'japanese_audio/わかりますか.mp3',
        cardNumber: '08.'
    },
    9: {
        englishText: 'What is _ in Japanese?',
        japaneseText: '日本語で_は何ですか \n \n(Nihongo de _ wa Nan desu ka?)',
        audioLink: 'japanese_audio/日本語では何ですか.mp3',
        cardNumber: '09.'
    },
    10: {
        englishText: 'It’s Good',
        japaneseText: 'いいですよ',
        audioLink: 'japanese_audio/いいですよ.mp3',
        cardNumber: '10.'
    },
    11: {
        englishText: 'It’s Bad',
        japaneseText: 'だめです',
        audioLink: 'japanese_audio/だめです.mp3',
        cardNumber: '11.'
    },
    12: {
        englishText: 'Again, Please.',
        japaneseText: 'もう一度お願いします \n \n (Mou Ichido Onegai Shimasu)',
        audioLink: 'japanese_audio/もう一度お願いします.mp3',
        cardNumber: '12.'
    },
    13: {
        englishText: 'More Slowly, Please',
        japaneseText: 'ゆっくりお願いします \n \n(Yukkuri Onegai Shimasu)',
        audioLink: 'japanese_audio/ゆっくりお願いします.mp3',
        cardNumber: '13.'
    },
    14: {
        englishText: 'I Speak a Little Japanese',
        japaneseText: '少し日本語を話します \n \n(Sukoshi Nihongo wo Hanashimasu)',
        audioLink: 'japanese_audio/少し日本語を話します.mp3',
        cardNumber: '14.'
    },
    15: {
        englishText: 'Let’s Meet Again!',
        japaneseText: 'また会いましょう \n \n(Mata Aimashou)',
        audioLink: 'japanese_audio/また会いましょう.mp3',
        cardNumber: '15.'
    },
    16: {
        englishText: 'Where is the bathroom?',
        japaneseText: 'お手洗いはどこですか \n \n(Otearai wa doko desu ka)',
        audioLink: 'japanese_audio/お手洗いはどこですか.mp3',
        cardNumber: '16.'
    },
    17: {
        englishText: 'Do you use line?',
        japaneseText: 'Line を利用しますか \n \n(Line wo Riyou Shimasu ka)',
        audioLink: 'japanese_audio/Line を利用しますか.mp3',
        cardNumber: '17.'
    },
    18: {
        englishText: 'What happened?',
        japaneseText: 'どうしたんだ',
        audioLink: 'japanese_audio/どうしたんだ.mp3',
        cardNumber: '18.'
    },
    19: {
        englishText: 'Can you speak English?',
        japaneseText: '英語を話せますか \n \n(Eigo wo Hanasemasu ka:)',
        audioLink: 'japanese_audio/英語を話せますか .mp3',
        cardNumber: '19.'
    },
    20: {
        englishText: 'When Can We Meet?',
        japaneseText: 'いつは会えますか \n \n(Itsu wa Aemasu ka)',
        audioLink: 'japanese_audio/いつは会えますか.mp3',
        cardNumber: '20.'
    }
};
// The number of phrases in the JSON
phraseData.numberOfPhrases = _.size(phraseData.phraseJSON);
let frontJapaneseCardVisible = true;
// We use these arrays to record how well the user has learned each phrase. 
// The numbers stored in the arrays keys which map to each phrase in JSON object. 
// Initally, all phrases are in the first array - the untested array. 
// The far right right array is where the phrases which are perfected are.
let phraseProgressPiles = [[],[],[],[],[]];
for (let i = 1; i <= phraseData.numberOfPhrases; i++) {
    phraseProgressPiles[0].push(i);
}
// Initially, we go through the untested set of cards. This value corresponds to the 
// lowest progress pile which contains a number(s).
let lowestProgressPile = 0;

// Declare the audio so that is global within script.js.
let japaneseAudioRecording;

// Updates HTML with next phrase and audio. Also adds a click event to play pause audio 
function updateCurrentPhraseAndAudioHTML() {
    document.getElementById('english-text').innerText = phraseData.phraseJSON[phraseProgressPiles[lowestProgressPile][0]].englishText;
    document.getElementById('japanese-text').innerText = phraseData.phraseJSON[phraseProgressPiles[lowestProgressPile][0]].japaneseText;
    document.getElementById('english-number').innerText = phraseData.phraseJSON[phraseProgressPiles[lowestProgressPile][0]].cardNumber;
    document.getElementById('japanese-number').innerText = phraseData.phraseJSON[phraseProgressPiles[lowestProgressPile][0]].cardNumber;
    
    japaneseAudioRecording = new Audio(phraseData.phraseJSON[phraseProgressPiles[lowestProgressPile][0]].audioLink);

    var audioIsPlaying = function () {
        return japaneseAudioRecording
            && japaneseAudioRecording.currentTime > 0
            && !japaneseAudioRecording.paused
            && !japaneseAudioRecording.ended
            && japaneseAudioRecording.readyState > 2;
    }

    document.getElementById('audio-link').addEventListener('click',function() {
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
let japanesePhraseContainerHTML = document.getElementById('circle-area__body__front');
// japanesePhraseContainerHTML.style.visibility = 'visible';
let englishPhraseContainerHTML = document.getElementById('circle-area__body__back');
// englishPhraseContainerHTML.style.visibility = 'hidden';

let flipCardButtonHTML = document.getElementById('btn-flip');
flipCardButtonHTML.style.visibility = 'visible';

let progressButtonsHTML = document.getElementById('btn-progress-container');
progressButtonsHTML.style.visibility = 'hidden';

let circleContainerHTML = document.getElementById('circle-area__body');
// let circleContainerFrontHTML = document.getElementById('circle-area__front');
// let circleContainerFrontHTML = document.getElementById('circle-area__back');

// pressing the buttons
btnBadHTML = document.getElementById('btn-bad');
btnOkHTML = document.getElementById('btn-ok');
btnGoodHTML = document.getElementById('btn-good');
btnGreatHTML = document.getElementById('btn-great');

// Hides/displays front or back of the flashcard when flip is pressed. 
flipCard = function() {
    if (frontJapaneseCardVisible) {
        circleContainerHTML.classList.add('flip-circle');
        circleContainerHTML.classList.remove('unflip-circle');
        
        

        flipCardButtonHTML.style.visibility = 'hidden';
        progressButtonsHTML.style.visibility = 'visible';
        if (!japaneseAudioRecording.paused) {
            japaneseAudioRecording.pause();
        }

        frontJapaneseCardVisible = false;

    }
    else {
        circleContainerHTML.classList.remove('flip-circle');
        circleContainerHTML.classList.add('unflip-circle');
        progressButtonsHTML.style.visibility = 'hidden';
        flipCardButtonHTML.style.visibility = 'visible';
        frontJapaneseCardVisible = true;

        
    }
    japanesePhraseContainerHTML.classList.add('flip-shadow');
    englishPhraseContainerHTML.classList.add('flip-shadow');
    englishPhraseContainerHTML.classList.remove('flip-unshadow');
    japanesePhraseContainerHTML.classList.remove('flip-unshadow');

    setTimeout(() => {
        englishPhraseContainerHTML.classList.remove('flip-shadow');
        japanesePhraseContainerHTML.classList.remove('flip-shadow');
        japanesePhraseContainerHTML.classList.add('flip-unshadow');
        englishPhraseContainerHTML.classList.add('flip-unshadow');
    }, 1500);
};
flipCardButtonHTML.addEventListener('click', flipCard);


// Allocate the tested card to its new progressPile, 
// Update the current phrase HTML
// Update the progress count HTML 
// Flip the card from back to front. 
function progressCheck(buttonPressed) {
    current = phraseProgressPiles[lowestProgressPile].shift();

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
        if (phraseProgressPiles[4].length === phraseData.numberOfPhrases) {
            endCredits();
        }
    }
    // Find the lowest level of confidence pile
    for (var i = 4; i >= 0; i--) {
        if (phraseProgressPiles[i].length > 0){
            lowestProgressPile = i;
        }
    }

        
        flipCard();
        setTimeout(function() {updateCurrentPhraseAndAudioHTML();}, 750);
        
}

function calculateProgressNumber() {
    let progressPercent = 0;
    let pointsEarned = 0;
    let totalPointsAvailable = 4 * phraseData.numberOfPhrases;
    for (let i = 1; i < phraseProgressPiles.length; i++ ) {
        pointsEarned += phraseProgressPiles[i].length * i
    }
    progressPercent = (pointsEarned / totalPointsAvailable) * 100;
    return progressPercent;
}
// This runs when the user completes 'great' on all words.
function endCredits() {
    document.getElementById('page-title').style.display = 'none';
    document.getElementById('circle-area').style.display = 'none';
    document.getElementById('button-area').style.display = 'none';
    document.getElementById('progress-area').style.display = 'none';
    document.body.removeAttribute('style');

    let endCreditsHTML = document.getElementById('end-credits');
    endCreditsContainerHTML = document.getElementById('end-credits-container');
    endCreditsContainerHTML.style.display = 'inline';

    let documentBodyStyle = document.body.style
    documentBodyStyle.backgroundColor = 'black';
    documentBodyStyle.width = '100%';
    documentBodyStyle.height = '100%';
}


// initalise the phrases and counts
(function() {
    updateCurrentPhraseAndAudioHTML();
})();