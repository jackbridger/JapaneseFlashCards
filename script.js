let phraseData = {};

phraseData.phraseJSON = 
// The Japanese, English and audio JSON
[{
        englishText: 'Good Weather, huh!',
        japaneseText: '今日もいい天気ですね \n \n(Kyōmoītenkidesu ne)',
        audioLink: 'japanese_audio/nice_weather.mp4',
        cardNumber: '01.'
    },
    {
        englishText: 'Long Time, No See!',
        japaneseText: '久しぶり！\n \n (Hisashiburi)',
        audioLink: 'japanese_audio/久しぶり.mp3',
        cardNumber: '02.'
    },
    {
        englishText: 'See You Later',
        japaneseText: 'じゃまた',
        audioLink: 'japanese_audio/じゃまた.mp3',
        cardNumber: '03.'
    },
    {
        englishText: 'Seriously?',
        japaneseText: 'マジで',
        audioLink: 'japanese_audio/マジで.mp3',
        cardNumber: '04.'
    },
    {
        englishText: 'No way!',
        japaneseText: 'うそ!',
        audioLink: 'japanese_audio/うそ!.mp3',
        cardNumber: '05.'
    },
    {
        englishText: 'Please Excuse Me (for Leaving)',
        japaneseText: '失礼します \n \n (Shitsurei Shimasu)',
        audioLink: 'japanese_audio/失礼します.mp3',
        cardNumber: '06.'
    },
    {
        englishText: 'You Must Be Tired or Thanks for Your Hard Work',
        japaneseText: 'お疲れ様でした \n \n (Otsukaresama Deshita)',
        audioLink: 'japanese_audio/お疲れ様でした.mp3',
        cardNumber: '07.'
    }, 
    {
        englishText: 'Do you understand?',
        japaneseText: 'わかりますか ',
        audioLink: 'japanese_audio/わかりますか.mp3',
        cardNumber: '08.'
    },
    {
        englishText: 'What is _ in Japanese?',
        japaneseText: '日本語で_は何ですか \n \n(Nihongo de _ wa Nan desu ka?)',
        audioLink: 'japanese_audio/日本語では何ですか.mp3',
        cardNumber: '09.'
    },
    {
        englishText: 'It’s Good',
        japaneseText: 'いいですよ',
        audioLink: 'japanese_audio/いいですよ.mp3',
        cardNumber: '10.'
    },
    {
        englishText: 'It’s Bad',
        japaneseText: 'だめです',
        audioLink: 'japanese_audio/だめです.mp3',
        cardNumber: '11.'
    },
    {
        englishText: 'Again, Please.',
        japaneseText: 'もう一度お願いします \n \n (Mou Ichido Onegai Shimasu)',
        audioLink: 'japanese_audio/もう一度お願いします.mp3',
        cardNumber: '12.'
    },
    {
        englishText: 'More Slowly, Please',
        japaneseText: 'ゆっくりお願いします \n \n(Yukkuri Onegai Shimasu)',
        audioLink: 'japanese_audio/ゆっくりお願いします.mp3',
        cardNumber: '13.'
    },
    {
        englishText: 'I Speak a Little Japanese',
        japaneseText: '少し日本語を話します \n \n(Sukoshi Nihongo wo Hanashimasu)',
        audioLink: 'japanese_audio/少し日本語を話します.mp3',
        cardNumber: '14.'
    },
    {
        englishText: 'Let’s Meet Again!',
        japaneseText: 'また会いましょう \n \n(Mata Aimashou)',
        audioLink: 'japanese_audio/また会いましょう.mp3',
        cardNumber: '15.'
    },
    {
        englishText: 'Where is the bathroom?',
        japaneseText: 'お手洗いはどこですか \n \n(Otearai wa doko desu ka)',
        audioLink: 'japanese_audio/お手洗いはどこですか.mp3',
        cardNumber: '16.'
    },
    {
        englishText: 'Do you use line?',
        japaneseText: 'Line を利用しますか \n \n(Line wo Riyou Shimasu ka)',
        audioLink: 'japanese_audio/Line を利用しますか.mp3',
        cardNumber: '17.'
    },
    {
        englishText: 'What happened?',
        japaneseText: 'どうしたんだ',
        audioLink: 'japanese_audio/どうしたんだ.mp3',
        cardNumber: '18.'
    },
    {
        englishText: 'Can you speak English?',
        japaneseText: '英語を話せますか \n \n(Eigo wo Hanasemasu ka:)',
        audioLink: 'japanese_audio/英語を話せますか .mp3',
        cardNumber: '19.'
    },
    {
        englishText: 'When Can We Meet?',
        japaneseText: 'いつは会えますか \n \n(Itsu wa Aemasu ka)',
        audioLink: 'japanese_audio/いつは会えますか.mp3',
        cardNumber: '20.'
    }
];
// The number of phrases in the JSON

let frontJapaneseCardVisible = true;
// We use these arrays to record how well the user has learned each phrase. 
// The numbers stored in the arrays keys which map to each phrase in JSON object. 
// Initally, all phrases are in the first array - the untested array. 
// The far right right array is where the phrases which are perfected are.
const phraseProgressPiles = [[],[],[],[],[]];

phraseData.phraseJSON.forEach((phrase, index) => {
    phraseProgressPiles[0].push(index);
}) 


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
        document.getElementById(element).innerText = phraseData.phraseJSON[phraseProgressPiles[lowestProgressPile][0]][elementsToUpdate[element]];
    } )

    japaneseAudioRecording = new Audio(phraseData.phraseJSON[phraseProgressPiles[lowestProgressPile][0]].audioLink);

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
flipCardButtonHTML.style.visibility = 'visible';

const progressButtonsHTML = document.getElementById('btn-progress-container');
progressButtonsHTML.style.visibility = 'hidden';

const circleContainerHTML = document.getElementById('circle-area__body');


// pressing the buttons
const btnBadHTML = document.getElementById('btn-bad');
const btnOkHTML = document.getElementById('btn-ok');
const btnGoodHTML = document.getElementById('btn-good');
const btnGreatHTML = document.getElementById('btn-great');

// Hides/displays front or back of the flashcard when flip is pressed. 
flipCard = () => {
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

        toggleVisibility(progressButtonsHTML, flipCardButtonHTML);

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
        if (phraseProgressPiles[4].length === phraseData.phraseJSON.length) {
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
    let totalPointsAvailable = 4 * phraseData.phraseJSON.length;
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

const toggleVisibility = (goHidden, goVisibile) => {
    goHidden.style.visibility = 'hidden';
    goVisibile.style.visibility = 'visible';
}


// initalise the phrases and counts
(() => {
    updateCurrentPhraseAndAudioHTML();
})();