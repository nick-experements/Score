

const NO_RISK = 'no-risk';
const VERY_SMALL_RISK = 'very-small-risk';
const SMALL_RISK = 'small-risk';
const MEDIUM_RISK = 'medium-risk';
const HIGH_RISK = 'high-risk';
const VERY_HIGH_RISK = 'very-high-risk';
const DANGER_RISK = 'danger-risk'
const VISIBLE = 'visible';
const REOPORT = 'report';


const LIFE_ADVICE = 'Здоровий спосіб життя'
const CARDIOLOG_ADVICE = 'Зверніться до кардіолога'



const riskGroups = {
    low: {
        name: '😀 Низький ризик', 
        advice: LIFE_ADVICE,
    },   
    medium: {
        name: '😲 Помірний ризик', 
        advice: CARDIOLOG_ADVICE,
    },
    high: {
        name: '⚠️ Високий ризик', 
        advice: CARDIOLOG_ADVICE,
    },
    danger: {
        name: '🚨 Дуже високий ризик', 
        advice: CARDIOLOG_ADVICE,
    },
}

function getRiskGroup (risk){
    if(risk < 1){
        return riskGroups.low
    } 
    if(risk < 5){
        return riskGroups.medium 
    }
    if(risk < 10){
        return riskGroups.high
    }
    return riskGroups.danger
}

function getRecomendationCategory (risk){
    if(risk < 1){
        return LIFE_ADVICE
    } else{
        return CARDIOLOG_ADVICE
    }
}


function getScoreCategory (score) { 
    if (score < 1){
        return NO_RISK
    }
    if(score < 2){
        return VERY_SMALL_RISK
    }
    if(score < 3){
        return SMALL_RISK
    }
    if(score < 5){
        return MEDIUM_RISK
    }
    if(score < 10){
        return HIGH_RISK
    }
    if(score < 15){
        return VERY_HIGH_RISK
    }
    return DANGER_RISK
    
}




function calculateScore() {
    let age  = parseInt(document.getElementById("age").value);
    let sex = document.getElementById("sex").value;
    let isSmoking = document.getElementById("smoking").value === "yes";
    let sbp = parseInt(document.getElementById("bp").value);
    let chol = parseFloat(document.getElementById("chol").value);
    
    const result = document.getElementById("result")
    const err = document.getElementById("err")
    result.classList.remove(REOPORT, NO_RISK, VERY_SMALL_RISK, SMALL_RISK, MEDIUM_RISK, HIGH_RISK, VERY_HIGH_RISK, DANGER_RISK)
    err.classList.remove(VISIBLE)
   
    if (!age || !sbp || !chol) {
        err.classList.add(VISIBLE)
        return
    }
    
    const risk = getScore(age, sex, isSmoking, chol, sbp, scoreTable)
    

    const riskGroup = getRiskGroup(risk)
    const riskClass = getScoreCategory (risk)

    
    result.classList.add(REOPORT, riskClass);
    // err.classList.remove(err)
    result.style.setProperty('--risk-category', `"${riskGroup.name}"`)
    result.style.setProperty('--risk-vallue', `"${risk}"`)
    result.style.setProperty('--recomendation', `"${riskGroup.advice}"`)

}