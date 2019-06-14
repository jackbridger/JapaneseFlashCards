const btnUntestedCounter = document.getElementById('card-new');
const btnBadCounter = document.getElementById('card-bad');
const btnOkCounter = document.getElementById('card-ok');
const btnGoodCounter = document.getElementById('card-good');
const btnExcellentCounter = document.getElementById('card-excellent');

const storeInformation = (choice)  => {
    counter[choice] += 1; 
    counter.untested -= 1;

    btnUntestedCounter.innerText = counter.untested;

    switch (choice) {
        case 'bad':
            btnBadCounter.innerText = counter[choice];
        break;
        case 'ok':
            btnOkCounter.innerText = counter[choice];
        break;
        case 'good':
            btnGoodCounter.innerText = counter[choice];
        break;
        case 'excellent':
            btnExcellentCounter.innerText = counter[choice];
        break;
    }
}

let counter =
    {
    untested: 30,
    bad: 0,
    ok: 0,
    good: 0,
    excellent: 0,
    }

let card_obj = function(){
    
    
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

}();


let phrases = function() {


    list_phrases = 
    [
        {
            englishText: 'It’s Good',
            japaneseText: 'いcheckecよ',
            audioLink: 'unknown',
            difficultyRating: 1,
            cardOrder: 1
        },
        {
            englishText: 'It’s Bad',
            japaneseText: 'だcececめです',
            audioLink: 'unknown',
            difficultyRating: 1,
            cardOrder: 1
        }
    ];

    japanese_text = document.getElementById('japanese-text');
    english_text = document.getElementById('english-text');


    
    update_text = function() {
        japanese_text.innerText = list_phrases[0].japaneseText;
        english_text.innerText = list_phrases[1].englishText;
    }

    update_text();





}();




