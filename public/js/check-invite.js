(function() {
  define(['websocket'], function(checkInvite) {
    var invite;
    invite = document.getElementById('invite');
    invite.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        return checkInvite();
      }
    });
    return checkInvite();
  });

}).call(this);
