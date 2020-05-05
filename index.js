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
    const data = await rp({ uri: 'https://prime.exchangerate-api.com/v5/76b653717686bfbfdd3fb10f/latest/TWD', json: true })
    if (msg.indexOf('usd') !== -1 || msg.indexOf('美金') !== -1 || msg.indexOf('美元') !== -1) {
      const answer = data.conversion_rates.USD
      event.reply('今日的美金匯率是:' + answer)
      console.log(answer)
    } else {
      event.reply('Oops!找不到您要的資料,請再輸入一次')
    }
  } catch (error) {
    console.log(error.message)
    msg = '發生錯誤'
  }
  event.reply(answer)
})

// 在port啟動
bot.listen('/', process.env.PORT, () => {
  console.log('line bot ready')
})
