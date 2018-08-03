module.exports = (ctx)=>{
    return /^\/[A-Za-z0-9_]+/.exec(ctx.update.message.text)[0]
}
