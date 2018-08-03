const urlParser = require('url')
const fs = require('fs')
const responses = {}

module.exports = (redisc, wsc)=>{
    return (req, res)=> {
        try{
            const arr = /^\/json\/([a-z][a-z0-9\-_]+)/.exec(req.url)
            if(!arr || !arr[1]) throw new Error('505. Bad url.')
            if(!responses[arr[1]] && !fs.existsSync(`${__dirname}/${arr[1]}.js`)) throw new Error('506. Bad url.')
            const obj = urlParser.parse(req.url, true).query
            const key = obj.path = arr[1]
            obj.raw = req
            const params = ['x-real-ip', 'user-agent', 'cookie', 'accept', 'referer']
            params.forEach((el)=>{
                if(!req.headers[el]) return
                obj[el] = req.headers[el]
            })    
            if(!responses[key]) responses[key] = require(`./${key}.js`)
            responses[key](obj, res, redisc, wsc)
        }
        catch(err){
            console.log(err)
            res.end('Server error')
        }
    }
}
