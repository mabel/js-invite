define ['ws'], (WS)->
    ()->
        main = document.querySelector 'main'
        input = document.getElementById 'invite'
        invite = input.value.trim() or localStorage.getItem 'invite'
        return unless invite and /^[a-zA-Z0-9_\-]{7,14}$/.test invite
        localStorage.removeItem 'invite'
        ws = new WS 'wss://js-invite.ru/ws', null, {maxReconnectAttempts: 10, reconnectInterval: 10000}

        ivl = null

        ws.onopen = ->
            clearInterval ivl unless not ivl
            ws.send invite
            ivl = setInterval ->
                    ws.send invite
                , 30000

        ws.onmessage = (msg)->
            if msg.data is 'ok'
                localStorage.setItem 'invite', invite
                input.value = ''
                main.innerHTML = 'Ваше приглашение действительно на текущее занятие.<br>Здесь будет демонстрироваться учебный материал.'
                return
            obj = JSON.parse(msg.data)
            if obj.vim_screen
                main.innerHTML = obj.vim_screen
                document.body.style.backgroundColor = 'black'

