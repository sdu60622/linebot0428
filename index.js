// 引用linebot套件
import linebot from 'linebot'
// 引用line機器人
import dotenv from 'dotenv'
// 引用request套件
import rp from 'request-promise'

// 讀取 .env檔
dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 當收到訊息
bot.on('message', async (event) => {
  // if (event.message.type === 'text') {
  //   event.reply(event.message.text)
  // }
  let msg = ''
  try {
    const data = await rp({ uri: 'http://data.fixer.io/api/latest?access_key=a447ac8212793bd067a2a72d052c44ba&format=1', json: true })
    msg = data.rates.USD
    console.log(msg)
  } catch (error) {
    console.log(error.message)
    msg = '發生錯誤'
  }
  event.reply(msg)
})

// 在port啟動
bot.listen('/', process.env.PORT, () => {
  console.log('line bot ready')
})
