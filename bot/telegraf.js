#!/usr/bin/node

const {tg_token, ws_token, ws_port, http_port} = require('../etc/credentials.js')
const Telegraf = require('telegraf')
const bot = new Telegraf(tg_token)
const WebSocket = require('ws')
const wss = new WebSocket.Server({port: ws_port})
const wsc = new WebSocket('ws://localhost:3501/admin', {headers: {token: ws_token}})
const redis = require('redis')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
const redisc = redis.createClient()

require('./modules/admin.js')(bot, redisc)
require('../bot/services/websocket.js')(redisc, wss, wsc)
require('http').createServer(require('./services/http-servlet.js')(redisc, wsc)).listen(http_port)
//require('./modules/menu.js')(bot, redisc)
//require('./modules/payments.js')(redisc, tg)

bot.startPolling()
