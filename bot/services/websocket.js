const WebSocket = require('ws')
const {ws_token} = require('../../etc/credentials.js')
const members = {}

const validChat = (key)=>{
    const chat = members[key]
    const ok = chat && chat.conn && chat.conn.readyState == WebSocket.OPEN
    return ok && chat
}

const broadcast = (msg)=>{
    if(msg == 'ping') return
    console.log(Object.keys(members))
    for(const key in members){
        const chat = validChat(key)
        if(!chat || chat.ban) continue
        chat.conn.send(msg)
    }
}

module.exports = (redisc, wss, wsc)=>{
    wss.on('connection', (ws, req)=> {
        ws.on('message', async (msg)=> {
            if(req.headers.token == ws_token){broadcast(msg); return}
            if(!/^[a-zA-Z0-9_\-]{7,19}$/.test(msg)) {ws.close(); return}
            const isMember = await redisc.sismemberAsync('jsi:tokens:valid', msg)
            if(!isMember) {ws.close(); return} 
            if(!validChat(msg)) {members[msg] = {conn: ws}; ws.send('ok')}
        })
    })
    wsc.on('open', ()=> {
        wsc.send('ping')
        setInterval(()=>{wsc.send('ping')}, 30000)
    })
    
}
