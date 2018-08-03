const shortid = require('shortid')
const cmdArgs = require('../util/cmd-args.js')

module.exports = (redisc)=>{
    return (ctx)=>{
        const args = cmdArgs(ctx)
        redisc.srem('jsi:tokens:valid', args)
        ctx.reply('OK')
    }
}
