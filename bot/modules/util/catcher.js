module.exports = (ctx, ex, opts)=> {
    console.log(ex)
    const msg = typeof ex == 'string' ? ex : 'Ошибка на стороне сервера.'
    if(msg.indexOf('`') > -1 || /\*[^\s]/.test(msg)) ctx.replyWithMarkdown(msg, opts)
    else ctx.reply(msg, opts)
}

