const shortid = require('shortid')
const cmdArgs = require('../util/cmd-args.js')
const catcher = require('../util/catcher.js')

module.exports = (redisc)=>{
    return async (ctx)=>{
        try{
            const arr = await redisc.smembersAsync('jsi:tokens:valid')
            ctx.reply(arr.join('\n'))
        }
        catch(ex){catcher(ctx, ex)}
    }
}
