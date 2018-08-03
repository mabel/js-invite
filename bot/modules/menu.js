const dict  = require('./menu/_dictionary.js')
const main  = require('./menu/_show-main.js')
const promo = require('./menu/_promo.js')
const isEng = require('./util/is-english.js')

module.exports = (bot, redisc)=>{
    const getMenu = main(bot, redisc, dict(isEng(bot) ? 'en' : 'ru')) 
    bot.help(getMenu())
    bot.start(async ()=>{
        try{
            const showRef = await promo(bot, redisc, dict)(ctx)
            getMenu(ok)
        }
        catch(ex){
            console.log(ex)
            getMenu(true)
        }
    })
}
