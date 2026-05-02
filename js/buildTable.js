

async function loadData() {
    const response = await fetch('./score_table.json');
    const data = await response.json();
    return data;
}

async function buildScores(){
    const scoreTable = await loadData();

   
    buildBox ([[7, 8, 9, 10, 12], [5, 5, 6, 7, 8, ], [3, 3, 4, 5, 6, ], [2, 2, 3, 3, 4, ]], document.body)

}
  
  

function buildTables (scoreTable) {
    const womenNoSmokers = scoreTable.filter(record => record.gender === 'female' && record.isSmoker === false)
    const womenSmokers = scoreTable.filter(record => record.gender === 'female' && record.isSmoker === true)
    const menNoSmokers = scoreTable.filter(record => record.gender === 'male' && record.isSmoker === false)
    const menSmokers = scoreTable.filter(record => record.gender === 'male' && record.isSmoker === true)

    buildTable(womenNoSmokers)
    buildTable(womenSmokers)
    buildTable(menNoSmokers)
    buildTable(menSmokers)
}



function buildTable (scoreTable) { 
    for(var i = 0; i < scoreTable.length; i++){
        if(i % 5 != 0){
            drawCell(scoreTable[i].score, document.body)
        } else {

        }

    }
}

function buildBox (scoreBox, container) {
    const scoreBoxElement = document.createElement("div");
    container.appendChild(scoreBoxElement)
    scoreBoxElement.classList.add("score-box")

    for(var i = 0; i < scoreBox.length; i ++){

        buildLine(scoreBox[i], scoreBoxElement)
    }
}

function buildLine (scoreRow, container){
    const scoreRowElement = document.createElement("div");
    container.appendChild(scoreRowElement)
    scoreRowElement.classList.add("score-row")

    for(var i = 0; i < scoreRow.length; i ++){

        drawCell(scoreRow[i], scoreRowElement)
    }

}

function drawCell (scoreNumber, container) {
    const scoreClass = getScoreCategory (scoreNumber)
    
    const cellElement = document.createElement("div");
    container.appendChild(cellElement)
    cellElement.outerHTML = 
    `<div class="score-cell ${scoreClass}">
    ${scoreNumber}
    </div>`
}
function getScoreCategory (score) { 
    if (score < 1){
        return 'no-risk'
    }
    if(score < 2){
        return 'very-small-risk'
    }
    if(score < 3){
        return 'small-risk'
    }
    if(score < 5){
        return 'medium-risk'
    }
    if(score < 10){
        return 'high-risk'
    }
    if(score < 15){
        return 'very-high-risk'
    }
    return 'danger-risk'
    
}



// drawCell(0, document.body)
// drawCell(1, document.body)
// drawCell(2, document.body)
// drawCell(3, document.body)
// drawCell(5, document.body)
// drawCell(10, document.body)
// drawCell(44, document.body)

buildScores()