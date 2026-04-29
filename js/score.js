function normolizeAge(age){
    const scale = age >= 50 ? 5 : 10;
    const rengedAge = Math.max(Math.min(age, 69), 40);
    let resultAge = Math.floor(rengedAge/scale)*scale;


    return resultAge
}
function normolizeCl(cl){
    const rengedCl = Math.max(Math.min(cl, 8), 4);
    let resultCl = Math.round(rengedCl);

    return resultCl;
}

function normolizePr(pr){
    const scale = 20;
    const rengedPr = Math.max(Math.min(pr, 180), 120);
    let resultPr = Math.round(rengedPr/scale)*scale;

    return resultPr;
}

function getScore(age, gender, isSmoking, cl, pr, scoreTable) {
    const normAge = normolizeAge(age);
    var normCl = normolizeCl(cl);
    var normPr = normolizePr(pr);
    for (var i = 0; i < scoreTable.length; i++){
        const scoreRecord = scoreTable[i];
        if(scoreRecord.gender === gender && scoreRecord.age === normAge && scoreRecord.isSmoker === isSmoking && scoreRecord.systolicBloodPressure === normPr && scoreRecord.cholesterol === normCl){
            const score = scoreRecord.score;
            return score;
        };
    };
};