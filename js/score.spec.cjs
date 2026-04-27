const { describe, it } = require('mocha');
const { expect } = require('chai');
const scoreTable = require('../score_table.json');
const { getScore } = require('./score.cjs');

const testCases = [ {
    age: 65,
    gender: 'female',
    isSmoker: false,
    cl: 7,
    pr: 140,
    expectetResult: 5

}, {
    age: 60,
    gender: 'male',
    isSmoker: false,
    cl: 5,
    pr: 120,
    expectetResult: 3,
}, {
    title: 'age fracrion',
    age: 63,
    gender: 'male',
    isSmoker: false,
    cl: 5,
    pr: 120,
    expectetResult: 3,
}
]

describe ('score', function(){
    it ('should be a function', function(){
        expect(getScore).to.be.a('function')
    })
    // it ('test chemistry', function(){
    //     expect(score(2)).to.be.equal(3)
    // })
    for(var caseIndex = 0; caseIndex < testCases.length; caseIndex ++){
        const testCase = testCases[caseIndex];
        const title = testCase.title || `simple test #${caseIndex} age - ${testCase.age} gender - ${testCase.gender} isSmoker - ${testCase.isSmoker} cl - ${testCase.cl} pr - ${testCase.pr}`
        it (title, function() {
                 const result = getScore(testCase.age, testCase.gender, testCase.isSmoker, testCase.cl, testCase.pr, scoreTable)
                 expect(result).to.be.equal(testCase.expectetResult)
            })
        
    }
    // it ('simple test', function() {
    //     const result = getScore(65, 'female', false, 7, 140, scoreTable)
    //     expect(result).to.be.equal(5)
    // })

});
