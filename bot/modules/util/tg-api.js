const fs = require('fs')
const request = require('request')

module.exports = (req, token)=>{
    let url = `https:\/\/api.telegram.org/bot${token}/${req}`
    return new Promise((yep, nop)=>{
        request.get({
            url: url
        }, (err, httpResponse, data)=> {
            if(err) {console.log(err);nop('Ошибка при запросе к сервису Telegram.')}
            yep(JSON.parse(data))
        })
    })
}
