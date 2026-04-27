function normolizeAge(age){
    const scale = age >= 50 ? 5 : 10
    let resultAge = Math.floor(age/scale)*scale;
    return resultAge
}

function getScore(age, gender, isSmoking, cl, pr, scoreTable) {
    const normAge = normolizeAge(age)
    for (var i = 0; i < scoreTable.length; i++){
        const scoreRecord = scoreTable[i];
        if(scoreRecord.gender === gender && scoreRecord.age === normAge && scoreRecord.isSmoker === isSmoking && scoreRecord.systolicBloodPressure === pr && scoreRecord.cholesterol === cl){
            const score = scoreRecord.score;
            return score;
        };
    };
};