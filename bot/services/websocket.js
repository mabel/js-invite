const members = {}

const validChat = (key)=>{
    const chat = members[key]
    const ok = chat && chat.conn && chat.conn.readyState == WebSocket.OPEN
    return ok && chat
}

const broadcast = (msg)=>{
    console.log(msg)
    if(msg == 'ping') return
    for(const key in members){
        const chat = validChat(key)
        if(!chat || chat.ban) continue
        chat.send(msg)
    }
}

module.exports = (redisc, wss, wsc)=>{
    wss.on('connection', (ws)=> {
        ws.on('message', async (msg)=> {
            if(/.*127\.0\.0\.1$/.test(ws._socket.remoteAddress)){broadcast(msg); return}
            if(!/^[a-zA-Z0-9_\-]{7,19}$/.test(msg)) {ws.close(); return}
            const isMember = await redisc.sismemberAsync('jsi:tokens:valid', msg)
            if(!isMember) {ws.close(); return} 
            if(!validChat(msg)) members[msg] = ws
        })
    })
    wsc.on('open', ()=> {
        wsc.send('ping')
        setInterval(()=>{wsc.send('ping')}, 30000)
    })
    
}
