const btnUntestedCounter = document.getElementById('card-new');
const btnBadCounter = document.getElementById('card-bad');
const btnOkCounter = document.getElementById('card-ok');
const btnGoodCounter = document.getElementById('card-good');
const btnExcellentCounter = document.getElementById('card-excellent');

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
    }
};

const list_length = _.size(list_phrases);


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



    let untested_arr = [1,2,3,4,5];
    let bad_arr = [];
    var current = untested_arr.shift();
    console.log('take off the top of the untested queue: ' + list_phrases[current].japaneseText);
    bad_arr.push(current);
    console.log('end of the bad queue: ' + list_phrases[bad_arr[0]].japaneseText);
    



    japanese_text = document.getElementById('japanese-text');
    english_text = document.getElementById('english-text');

}();

let untested_arr = [1,2,3,5,6];
let bad_arr = [];
let ok_arr = [];
let good_arr = [];
let excellent_arr = [];

function storeInformation(button) {
    var current = '';
    if (button === 'bad') {
        current = untested_arr.shift();
        console.log('take off the top of the untested queue: ' + list_phrases[current].japaneseText);
        bad_arr.push(current);
        console.log('end of the bad queue: ' + list_phrases[bad_arr[0]].japaneseText);
    }
    else if (button === 'ok') {
        current = untested_arr.shift();
        console.log('take off the top of the untested queue: ' + list_phrases[current].japaneseText);
        ok_arr.push(current);
        console.log('end of the bad queue: ' + list_phrases[ok_arr[0]].japaneseText);        
    }
    else if (button === 'good') {
        current = untested_arr.shift();
        console.log('take off the top of the untested queue: ' + list_phrases[current].japaneseText);
        good_arr.push(current);
        console.log('end of the bad queue: ' + list_phrases[good_arr[0]].japaneseText);        
    }
    else if (button === 'excellent') {
        current = untested_arr.shift();
        excellent_arr.push(current);
    }
    if (excellent_arr.length === list_length)
    {
        alert('completed everything')
    }

}