function getScore(age, gender, isSmoking, cl, pr, scoreTable) {
    for (var i = 0; i < scoreTable.length; i++){
        if(scoreTable[i].gender === gender && scoreTable[i].age === age && scoreTable[i].isSmoker === isSmoking && scoreTable[i].systolicBloodPressure === pr && scoreTable[i].cholesterol === cl){
            const score = scoreTable[i].score
            return score
        }
    }
}