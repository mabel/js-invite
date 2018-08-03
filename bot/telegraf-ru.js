#!/usr/local/bin/node

const {apiTokenRu} = require('./etc/credentials.js')
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const bot = new Telegraf(apiTokenRu)
const tg = new Telegram(apiTokenRu)
const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
const redisc = redis.createClient()

require('./modules/admin.js')(bot, redisc, tg)
require('./modules/menu.js')(bot, redisc)
require('./modules/payments.js')(redisc, tg)

bot.startPolling()
