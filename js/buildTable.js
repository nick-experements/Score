function buildTables (scoreTable) {
    const womenNoSmokers = scoreTable.filter(record => record.gender === 'female' && record.isSomker === flase)
    const womenSmokers = scoreTable.filter(record => record.gender === 'female' && record.isSomker === true)
    const menNoSmokers = scoreTable.filter(record => record.gender === 'male' && record.isSomker === flase)
    const menSmokers = scoreTable.filter(record => record.gender === 'male' && record.isSomker === true)

    buildTable(womenNoSmokers)
    buildTable(womenSmokers)
    buildTable(menNoSmokers)
    buildTable(menSmokers)
}
function buildTable (scoreTable) { 
    
}

function drawCell (scoreNumber, container) {
    const scoreClass = getScoreCategory (scoreNumber)
    
    const cellElement = document.createElement("div");

    cellElement.innerHTML = 
    `<div class="score-cell ${scoreClass}">
    ${scoreNumber}
    <div>`

    container.appendChild(cellElement)
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

drawCell(0, document.body)
drawCell(1, document.body)
drawCell(2, document.body)
drawCell(3, document.body)
drawCell(5, document.body)
drawCell(10, document.body)
drawCell(15, document.body)