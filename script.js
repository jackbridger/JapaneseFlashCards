const btnUntestedCounter = document.getElementById('card-new');
const btnBadCounter = document.getElementById('card-bad');
const btnOkCounter = document.getElementById('card-ok');
const btnGoodCounter = document.getElementById('card-good');
const btnExcellentCounter = document.getElementById('card-excellent');

const timerSpace = document.getElementById('timer-status');

let time = new Date();
const timeStart = time.getTime();

function updateCounter() {
    btnUntestedCounter.innerHTML = all_arrs[0].length
    btnBadCounter.innerHTML = all_arrs[1].length;
    btnOkCounter.innerHTML = all_arrs[2].length;
    btnGoodCounter.innerHTML = all_arrs[3].length;
    btnExcellentCounter.innerHTML = all_arrs[4].length;
}

function setUp() {
    updateCounter();
    document.getElementById('english-text').innerText = list_phrases[all_arrs[current_pile][0]].englishText;
    document.getElementById('japanese-text').innerText = list_phrases[all_arrs[current_pile][0]].japaneseText;
}

let current_pile = 0;

const list_phrases = 
{
    1: {
        englishText: 'It’s Good',
        japaneseText: 'japanese 1',
        audioLink: 'unknown'
    },
   2: {
        englishText: 'english 2',
        japaneseText: 'japanese 2',
        audioLink: 'unknown'
    },
    3: {
        englishText: 'english 3',
        japaneseText: 'japanese 3',
        audioLink: 'unknown'
    },
    4: {
        englishText: 'english 4',
        japaneseText: 'japanese 4',
        audioLink: 'unknown'
    },
    5: {
        englishText: 'english 5',
        japaneseText: 'japanese 5',
        audioLink: 'unknown'
    }
};
const list_length = _.size(list_phrases);

let all_arrs = [[],[],[],[],[]];
for (let i = 1; i <= list_length; i++) {
    all_arrs[0].push(i);
}

card_question = document.getElementById('flash-container-before');
card_answer = document.getElementById('flash-container-after');
card_question.style.visibility = 'visible';
card_answer.style.visibility = 'hidden';

flipCard = function() {
    if (card_question.style.visibility === 'visible') {
        card_question.style.visibility = 'hidden';}
    else {
        card_question.style.visibility = 'visible';} 

    if (card_answer.style.visibility === 'visible') {
        card_answer.style.visibility = 'hidden';}
    else {
        card_answer.style.visibility = 'visible';} 
};

card_question.addEventListener('click', flipCard);


function storeInformation(button) {
    current = all_arrs[current_pile].shift();

    if (button === 'bad') {
        all_arrs[1].push(current);
    }
    else if (button === 'ok') {
        all_arrs[2].push(current);    
    }
    else if (button === 'good') {
        all_arrs[3].push(current);   
    }
    else if (button === 'excellent') {
        all_arrs[4].push(current);
    }
    if (all_arrs[4].length === list_length)
    {
        alert('completed everything')
    }

    for (var i = 4; i >= 0; i--) {
        if (all_arrs[i].length > 0){
            current_pile = i;
        }
    }
        updateCounter();
        flipCard();
        document.getElementById('english-text').innerText = list_phrases[all_arrs[current_pile][0]].englishText;
        document.getElementById('japanese-text').innerText = list_phrases[all_arrs[current_pile][0]].japaneseText;

    console.log(all_arrs);
}

var timer = setInterval(function() {
    let currentTime = new Date();
    let timeElapsed = currentTime.getTime() - timeStart;
    timeElapsed = Math.floor(timeElapsed / 1000);
    let minutes = Math.floor(timeElapsed / 60);
    let seconds = timeElapsed - (minutes * 60)
    if (minutes > 0)
        timerSpace.innerHTML = minutes + 'm ' + seconds + 's'
    else 
        timerSpace.innerHTML = seconds + 's';
}, 1000);



document.onload = setUp();