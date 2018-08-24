const formidable = require('formidable')
const fs = require('fs')

module.exports = (req, res, redisc, wsc)=>{
    if(req.method.toLowerCase() != 'post') {res.end('Only post method allowed'); return}
    const form = new formidable.IncomingForm()
    form.parse(req.raw, function(err, fields, files) {
        const fn = files.screen.path
        const vim_screen = fs.readFileSync(fn, 'utf-8')
        console.log(wsc.status)
        wsc.send(JSON.stringify({vim_screen}))
        fs.unlinkSync(fn) 
    })
    res.end('ok')
}
