const {botManagers} = require('../../etc/credentials.js')

module.exports = (ctx)=>{
    const adminId = (ctx.from && ctx.from.id) || ctx.update.message.from.id
    const ok = botManagers.indexOf(+adminId) > -1
    if(!ok) ctx.reply('Недостаточно полномочий.')
    return ok
}

