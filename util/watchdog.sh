PID_TG=`ps ax | grep [t]elegraf\.js | egrep -o '^[ 0-9]+'`

if [ -z "$PID_TR" ]; then
        ../bot/telegraf.js &>/dev/null &
fi
