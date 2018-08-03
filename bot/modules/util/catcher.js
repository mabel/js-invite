const back = require('../menu/_show-back.js').replyOptions

module.exports = (ctx, ex, opts)=> {
    console.log(ex)
    const msg = typeof ex == 'string' ? ex : 'Ошибка на стороне сервера.'
    opts = opts || back
    if(msg.indexOf('`') > -1) ctx.replyWithMarkdown(msg, opts)
    else ctx.reply(msg, opts)
}

