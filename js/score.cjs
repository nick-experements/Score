const  { readFileSync } = require('fs')
const  { join: joinPaths } = require('path')
const src = readFileSync(joinPaths(__dirname, './score.js'), 'utf8')


const scoreWrapped = new Function(`
    ${src}

    return getScore(...Array.from(arguments))
`)

module.exports = {
    getScore: scoreWrapped,
};
