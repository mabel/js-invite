define ['websocket'], (checkInvite)->
    invite = document.getElementById('invite')
    invite.addEventListener 'keydown', (e)->
        if e.key is 'Enter'
            checkInvite()
    checkInvite()
