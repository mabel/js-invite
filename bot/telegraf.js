#!/usr/bin/node

const {token} = require('./etc/credentials.js')
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const bot = new Telegraf(token)
const tg = new Telegram(token)
const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
const redisc = redis.createClient()

require('./modules/admin.js')(bot, redisc, tg)
//require('./modules/menu.js')(bot, redisc)
//require('./modules/payments.js')(redisc, tg)
//

bot.startPolling()