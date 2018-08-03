const emojify = require('node-emoji').emojify
const fs = require('fs')

module.exports = (fn, suff)=>{
    fn = /(.*\/)([a-zA-Z\-\\]+)(\.js)/.exec(fn)[2].replace('\\', '/')
    const path = `${__filename.replace(/[^\/]+$/, '../../documents/')}${fn}${suff || ''}.md`
    return emojify(fs.readFileSync(path, 'utf8'))
}

