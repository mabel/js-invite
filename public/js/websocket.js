(function() {
  define(['ws'], function(WS) {
    return function() {
      var input, invite, ivl, main, ws;
      main = document.querySelector('main');
      input = document.getElementById('invite');
      invite = input.value.trim() || localStorage.getItem('invite');
      if (!(invite && /^[a-zA-Z0-9_\-]{7,14}$/.test(invite))) {
        return;
      }
      localStorage.removeItem('invite');
      ws = new WS('wss://js-invite.ru/ws', null, {
        maxReconnectAttempts: 10,
        reconnectInterval: 10000
      });
      ivl = null;
      ws.onopen = function() {
        if (!!ivl) {
          clearInterval(ivl);
        }
        ws.send(invite);
        return ivl = setInterval(function() {
          return ws.send(invite);
        }, 30000);
      };
      return ws.onmessage = function(msg) {
        var obj;
        if (msg.data === 'ok') {
          localStorage.setItem('invite', invite);
          input.value = '';
          main.innerHTML = 'Ваше приглашение действительно на текущее занятие.<br>Здесь будет демонстрироваться учебный материал.';
          return;
        }
        obj = JSON.parse(msg.data);
        if (obj.vim_screen) {
          main.innerHTML = obj.vim_screen;
          return document.body.style.backgroundColor = 'black';
        }
      };
    };
  });

}).call(this);
