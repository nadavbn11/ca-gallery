'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    renderQuest();
    // TODO: show the quest section
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update its text by the currQuest text
    $(".quest").show();
    $(".btn-lg").hide();
    $(".title").hide();

    console.log(gCurrQuest);

    $('.currQues').text(gCurrQuest.txt);

}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            console.log('Yes, I knew it!');
            // TODO: improve UX
        } else {
            console.log('I dont know...teach me!')
            $('.game-start').hide();
            $('.quest').hide();
            $('.new-quest').show();
            // TODO: hide and show new-quest section

        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(ev) {
    ev.preventDefault()
    console.log("enter to onaddguss func");
    var newQuest = $(".newQuest").val();
    var newGuess = $(".newGuess").val();
    addGuess(newQuest, newGuess, gLastRes);
    //  debugger
    gCurrQuest = gQuestsTree;
    // debugger
    onRestartGame();
    //  $(".quest").show();


}


function onRestartGame() {
    console.log('im in')
    $('.game-start').show();
    $('.new-quest').hide();
    gLastRes = null;
}

