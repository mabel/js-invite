const shortid = require('shortid')
const checkAdmin = require('./util/check-admin.js')

const cmds = [
    'token_add',
    'token_rem',
    'tokens_valid',
]

module.exports = (bot, redisc, tg)=>{
    cmds.forEach((cmd)=>{
        const module = require(`./admin/${cmd.replace(/_/g, '-')}.js`)(redisc, tg)
        bot.command(cmd, (ctx)=>{
            if(!checkAdmin(ctx)) return
            module(ctx)
        })
    })
}
