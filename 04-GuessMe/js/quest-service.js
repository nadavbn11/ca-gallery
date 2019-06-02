var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    gQuestsTree = createQuest('Male?');

    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');

    gCurrQuest = gQuestsTree;

    gPrevQuest = null;

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, res) {
    console.log("the parameters are: ", newQuestTxt, newGuessTxt, res);
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;

    gPrevQuest[res]=newQuest

}


