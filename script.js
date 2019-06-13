let card_obj = function(){
    card_question = document.getElementById('flash-container-before');
    card_answer = document.getElementById('flash-container-after');

    flipCard = function() {

        card_question.style.visibility = 'hidden';
        card_answer.style.visibility = 'visible';
    };

    card_question.addEventListener('click',flipCard);



}();