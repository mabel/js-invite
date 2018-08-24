const cmdArgs = require('../util/cmd-args.js')
const shortid = require('shortid')

module.exports = (redisc)=>{
    return (ctx)=>{
        const args = cmdArgs(ctx)
        const shid = args || shortid()
        redisc.sadd('jsi:tokens:valid', shid)
        ctx.reply(shid)
    }
}
