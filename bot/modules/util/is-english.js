const {apiTokenEn} = require('../../etc/credentials.js')

module.exports = (bot)=>{
    return bot.token == apiTokenEn
}
