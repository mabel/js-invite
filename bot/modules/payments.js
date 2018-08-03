const {merchantId, merchantSecret} = require('../etc/credentials.js')
const CoinPayments = require('coinpayments')
const express = require('express')
const bodyParser = require('body-parser')
const catcher = require('./payments/catcher.js')
const checkPayment = require('./payments/check-payment.js')
const distribute = require('./payments/distribute.js')
const license = require('./payments/license.js')

const moment = require('moment')
moment.locale('ru')

const events = CoinPayments.events
const app = express()
 
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/coinpayments/ipn', [CoinPayments.ipn({merchantId, merchantSecret}), (req, res, next)=> {res.end('ok')}])
app.listen(process.env.PORT || 3000, () => {
    console.log("Ready for IPNs")
})

module.exports = (redisc, tg)=>{

    events.on('ipn_complete', async (data)=>{
        console.log(`IPN COMPLETE (${data.invoice})`)
        try{
            await redisc.hmsetAsync(`crpt:invoice:ok:${data.invoice}`, data)
            await checkPayment(data, redisc, tg) 
            await license(data, redisc, tg)
            await distribute(data, redisc, tg)
        }
        catch(ex){
            data.error = ex.toString()
            redisc.hmset(`crpt:invoice:err:${data.invoice}`, data)
            catcher(ex, data, tg)
        }
    })

    events.on('ipn_fail', (data)=>{
        console.log("IPN FAIL")
        catcher('IPN FAIL:\n', data, tg)        
        redisc.hmset(`crpt:invoice:err:${data.invoice}`, data)
    })

    events.on('ipn_pending', (data)=>{console.log("IPN PENDING")})
}
