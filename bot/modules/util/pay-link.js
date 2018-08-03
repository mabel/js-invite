const {merchantId} = require('../../etc/credentials.js')
module.exports = (item, invoice, currency, price)=>{
    return [
        'https://www.coinpayments.net/index.php?cmd=_pay',
        'reset=1',
        `merchant=${merchantId}`,
        `item_name=${encodeURIComponent(item)}`,
        `invoice=${invoice}`,
        `currency=${currency}`,
        `amountf=${price}`,
        'quantity=1',
        'allow_quantity=0',
        'want_shipping=0',
        'allow_extra=0'
    ].join('&')

}
