// The Japanese, English and audio JSON
const phraseJSON = 
{
    1: {
        englishText: 'Good Weather, huh!',
        japaneseText: 'いい天気ですね (Ii Tenki desu ne)',
        audioLink: 'nice_weather.mp4'
    },
   2: {
        englishText: 'Long Time, No See!',
        japaneseText: '久しぶり！(Hisashiburi)',
        audioLink: 'nice_weather.mp4'
    },
    3: {
        englishText: 'See You Later',
        japaneseText: 'じゃまた',
        audioLink: 'unknown'
    },
    4: {
        englishText: 'Seriously?',
        japaneseText: 'マジで',
        audioLink: 'unknown'
    },
    5: {
        englishText: 'No way!',
        japaneseText: 'うそ!',
        audioLink: 'unknown'
    },
    6: {
        englishText: 'Please Excuse Me (for Leaving)',
        japaneseText: '失礼します (Shitsurei Shimasu)',
        audioLink: 'unknown'
    },
    7: {
        englishText: 'You Must Be Tired or Thanks for Your Hard Work',
        japaneseText: 'お疲れ様でした (Otsukaresama Deshita)',
        audioLink: 'unknown'
    }
    ,    
    8: {
        englishText: 'Do you understand?',
        japaneseText: 'わかりますか ',
        audioLink: 'unknown'
    },
    9: {
        englishText: 'What is _ in Japanese?',
        japaneseText: '日本語で_は何ですか (Nihongo de _ wa Nan desu ka?)',
        audioLink: 'unknown'
    },
    10: {
        englishText: 'It’s Good',
        japaneseText: 'いいですよ',
        audioLink: 'unknown'
    },
    11: {
        englishText: 'It’s Bad',
        japaneseText: 'だめです',
        audioLink: 'unknown'
    },
    12: {
        englishText: 'Again, Please.',
        japaneseText: 'もう一度お願いします (Mou Ichido Onegai Shimasu)',
        audioLink: 'unknown'
    },
    13: {
        englishText: 'More Slowly, Please',
        japaneseText: 'ゆっくりお願いします (Yukkuri Onegai Shimasu)',
        audioLink: 'unknown'
    },
    14: {
        englishText: 'I Speak a Little Japanese',
        japaneseText: '少し日本語を話します (Sukoshi Nihongo wo Hanashimasu)',
        audioLink: 'unknown'
    },
    15: {
        englishText: 'Let’s Meet Again!',
        japaneseText: 'また会いましょう (Mata Aimashou)',
        audioLink: 'unknown'
    },
    16: {
        englishText: 'Where is the bathroom?',
        japaneseText: 'お手洗いはどこですか (Otearai wa doko desu ka)',
        audioLink: 'unknown'
    },
    17: {
        englishText: 'Do you use line?',
        japaneseText: 'Line を利用しますか (Line wo Riyou Shimasu ka)',
        audioLink: 'unknown'
    },
    18: {
        englishText: 'What happened?',
        japaneseText: 'どうしたんだ',
        audioLink: 'unknown'
    },
    19: {
        englishText: 'Can you speak English?',
        japaneseText: '英語を話せますか (Eigo wo Hanasemasu ka:)',
        audioLink: 'unknown'
    },
    20: {
        englishText: 'When Can We Meet?',
        japaneseText: 'いつは会えますか (Itsu wa Aemasu ka)',
        audioLink: 'unknown'
    }
};
// The number of phrases in the JSON
const numberOfPhrases = _.size(phraseJSON);
let frontJapaneseCardVisible = true;
// We use these arrays to record how well the user has learned each phrase. 
// The numbers stored in the arrays keys which map to each phrase in JSON object. 
// Initally, all phrases are in the first array - the untested array. 
// The far right right array is where the phrases which are perfected are.
let phraseProgressPiles = [[],[],[],[],[]];
for (let i = 1; i <= numberOfPhrases; i++) {
    phraseProgressPiles[0].push(i);
}
// Initially, we go through the untested set of cards. This value corresponds to the 
// lowest progress pile which contains a number(s).
let lowestProgressPile = 0;


// Updates HTML with next phrase 
function updateCurrentPhraseHTML() {
    document.getElementById('english-text').innerText = phraseJSON[phraseProgressPiles[lowestProgressPile][0]].englishText;
    document.getElementById('japanese-text').innerText = phraseJSON[phraseProgressPiles[lowestProgressPile][0]].japaneseText;
    document.getElementById('audio-container').src = phraseJSON[phraseProgressPiles[lowestProgressPile][0]].audioLink;
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

        frontJapaneseCardVisible = false;
    }
    else {
        circleContainerHTML.classList.remove('flip-circle');
        circleContainerHTML.classList.add('unflip-circle');
        progressButtonsHTML.style.visibility = 'hidden';
        flipCardButtonHTML.style.visibility = 'visible';
        frontJapaneseCardVisible = true;
    }
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
    }
    if (phraseProgressPiles[4].length === numberOfPhrases)
    {
        alert('completed everything')
    }
    // Find the lowest level of confidence pile
    for (var i = 4; i >= 0; i--) {
        if (phraseProgressPiles[i].length > 0){
            lowestProgressPile = i;
        }
    }

        
        flipCard();
        setTimeout(function() {updateCurrentPhraseHTML();}, 750);
        
}



// initalise the phrases and counts
(function() {
    updateCurrentPhraseHTML();
})();