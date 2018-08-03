const shortid = require('shortid')

module.exports = (redisc)=>{
    return (ctx)=>{
        const shid = shortid()
        redisc.sadd('jsi:tokens:valid', shid)
        ctx.reply(shid)
    }
}
