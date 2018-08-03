#!/usr/bin/node

const {token, ws_port, http_port} = require('../etc/credentials.js')
//const Telegraf = require('telegraf')
//const Telegram = require('telegraf/telegram')
//const bot = new Telegraf(token)
//const tg = new Telegram(token)
const WebSocket = require('ws')
const wss = new WebSocket.Server({port: ws_port})
const wsc = new WebSocket('ws://localhost:3501/ws')
const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
const redisc = redis.createClient()

//require('./modules/admin.js')(bot, redisc, tg)
require('../bot/services/websocket.js')(redisc, wss, wsc)
require('http').createServer(require('./services/http-servlet.js')(redisc, wsc)).listen(http_port)
//require('./modules/menu.js')(bot, redisc)
//require('./modules/payments.js')(redisc, tg)
//

//bot.startPolling()
