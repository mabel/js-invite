const checkAdmin = require('./admin/_check-admin.js')

const goods = ['vip', 'whip', 'free', 'simple']
const cmds = [
        'info',
        'update',
        'channels',
        'pump_code',
        'settings_vip_en',
        'settings_vip_ru',
        'settings_free_en',
        'settings_free_ru',
        'settings_ref_en',
        'settings_ref_ru',
        'settings_bonus_en',
        'settings_bonus_ru',
        'title_en',
        'docs',
        'backup',
        'kill',
        'proc_id',
      ]

module.exports = (bot, redisc, tg)=>{
    cmds.forEach((cmd)=>{
        const module = require(`./admin/${cmd.replace(/_/g, '-')}.js`)(redisc, tg)
        bot.command(cmd, (ctx)=>{
            if(!checkAdmin(ctx)) return
            module(ctx)
        })
    })
    goods.forEach((good)=>{
        ['add', 'rem', 'list'].forEach((cmd)=>{
            ['en', 'ru'].forEach((lang)=>{
                const module = require('./admin/_good-maker.js')(redisc, tg, cmd, good, lang)
                bot.command(`${cmd}_${good}_${lang}`, (ctx)=>{
                    if(!checkAdmin(ctx)) return
                    module(ctx)
                })
            })
        })
    })
    bot.command('admin', require('./admin/help.js'))
    const uploader = require('./admin/_upload.js')
    bot.on('document', (ctx)=>{
        if(!checkAdmin(ctx)) return
        uploader(ctx) 
    })
    //require('./admin/cron.js')(tg)
}
