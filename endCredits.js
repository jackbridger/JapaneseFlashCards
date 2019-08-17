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