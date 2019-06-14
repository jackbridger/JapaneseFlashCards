const btnUntestedCounter = document.getElementById('card-new');
const btnBadCounter = document.getElementById('card-bad');
const btnOkCounter = document.getElementById('card-ok');
const btnGoodCounter = document.getElementById('card-good');
const btnExcellentCounter = document.getElementById('card-excellent');

// const storeInformation = (choice)  => {
//     counter[choice] += 1; 
//     counter.untested -= 1;

//     btnUntestedCounter.innerText = counter.untested;

//     switch (choice) {
//         case 'bad':
//             btnBadCounter.innerText = counter[choice];
//         break;
//         case 'ok':
//             btnOkCounter.innerText = counter[choice];
//         break;
//         case 'good':
//             btnGoodCounter.innerText = counter[choice];
//         break;
//         case 'excellent':
//             btnExcellentCounter.innerText = counter[choice];
//         break;
//     }
// }

// let dataStorer =
//     {
//     untested: 30,
//     bad: {
//         cards: [2,6,9] // use ids list_phrases[bad[cards[i]]]
        

//         ]
//     },
//     ok: 0,
//     good: 0,
//     excellent: 0,
//     }

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

    let untested_arr = [1,2,3,4,5];
    let bad_arr = [];
    var current = untested_arr.shift();
    console.log('take off the top of the untested queue: ' + list_phrases[current].japaneseText);
    bad_arr.push(current);
    console.log('end of the bad queue: ' + list_phrases[bad_arr[0]].japaneseText);
    
    current = untested_arr.shift();
    console.log('take off the top of the untested queue: ' + list_phrases[current].japaneseText);
    bad_arr.push(current);
    console.log('end of the bad queue: ' + list_phrases[bad_arr[1]].japaneseText);
    
    current = untested_arr.shift();
    console.log('take off the top of the untested queue: ' + list_phrases[current].japaneseText);
    bad_arr.push(current);
    console.log('end of the bad queue: ' + list_phrases[bad_arr[2]].japaneseText);
    

    alert(bad_arr);


    japanese_text = document.getElementById('japanese-text');
    english_text = document.getElementById('english-text');

}();




