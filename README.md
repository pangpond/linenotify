# linenotify

get token from [Notify Bot](https://notify-bot.line.me/my/)

## Node
```
$ cp .env.dist .env
$ npm install
$ node index.js
```

## Docker
```
$ docker build -t linenotify:latest .

$ docker run -it --rm --name linebot -e TITLE="Line BOT" \
-e "TOKEN=<LINE TOKEN>" \
-e "URL=https://iapi.bot.or.th/Stat/Stat-ReferenceRate/DAILY_REF_RATE_V1/?" \
-e "KEY=U9G1L457H6DCugT7VmBaEacbHV9RX0PySO05cYaGsm" \
linenotify:latest
```
