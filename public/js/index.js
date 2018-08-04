(function() {
  require.config({
    waitSeconds: 30,
    baseUrl: 'js',
    paths: {
      ws: '//cdnjs.cloudflare.com/ajax/libs/reconnecting-websocket/1.0.0/reconnecting-websocket.min',
      moment: '//momentjs.com/downloads/moment-with-locales.min',
      vue: '//cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min',
      yaml: 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.11.0/js-yaml.min'
    }
  });

  require(['check-invite']);

}).call(this);
