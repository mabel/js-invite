module.exports = (ctx)=>{
    return ctx.update.message.text.replace(/^\/[A-Za-z0-9_]+/, '').trim()
}
