

async function loadData() {
    const response = await fetch('./score_table.json');
    const data = await response.json();
    return data;
}

async function buildScores(){
    const scoreTable = await loadData();
    buildTables (scoreTable)
}
  
  

function buildTables (scoreTable) {
    const womenNoSmokers = scoreTable.filter(record => record.gender === 'female' && record.isSmoker === false)
    const womenSmokers = scoreTable.filter(record => record.gender === 'female' && record.isSmoker === true)
    const menNoSmokers = scoreTable.filter(record => record.gender === 'male' && record.isSmoker === false)
    const menSmokers = scoreTable.filter(record => record.gender === 'male' && record.isSmoker === true)


    buildChart(scoreTableToChartData (womenNoSmokers), document.body)
    // buildChart(scoreTableToChartData (womenSmokers), document.body)
    // buildChart(scoreTableToChartData (menNoSmokers), document.body)
    // buildChart(scoreTableToChartData (menSmokers), document.body)
}

function scoreTableToChartData (scoreTable) { 
   
    const scoreChart = [65, 60, 55, 50, 40].map((age) => {
        const scoreBox =  [180, 160, 140, 120].map((presure) => {
            const row = scoreTable.filter(row => row.systolicBloodPressure === presure && row.age === age)
            var scoreRow = row.map((record) => record.score)
            return scoreRow
        })
        return scoreBox

    })
    return scoreChart



}

function buildTable (scoreTable) { 
    for(var i = 0; i < scoreTable.length; i++){
        if(i % 5 != 0){
            drawCell(scoreTable[i].score, document.body)
        } else {

        }

    }
}

// [[[], [], [], ][ , ][]]]

function buildChart (scoreChart, container) {
    const scoreChartElement = document.createElement("div");
    container.appendChild(scoreChartElement)
    scoreChartElement.classList.add("score-chart")

    for(var i = 0; i < scoreChart.length; i ++){

        buildBox(scoreChart[i], scoreChartElement)
    }
}


// [[1234],[534263],[64235],[246624],[16416]]
function buildBox (scoreBox, container) {
    const scoreBoxElement = document.createElement("div");
    container.appendChild(scoreBoxElement)
    scoreBoxElement.classList.add("score-box")

    for(var i = 0; i < scoreBox.length; i ++){

        buildLine(scoreBox[i], scoreBoxElement)
    }
}


// [1, 2, 3, 4, 5]
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