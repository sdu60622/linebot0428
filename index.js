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
  let msg = event.message.text.toLowerCase()
  const answer = ''
  try {
    // https://prime.exchangerate-api.com/v5/76b653717686bfbfdd3fb10f/latest/TWD
    const data = await rp({ uri: 'https://tw.rter.info/capi.php', json: true })
    const golddata = await rp({ uri: 'https://metals-api.com/api/latest?access_key=lt0y6y362c39l1k5zs25nff8pub63mftq1sf1dst3h0arb0hlt6w18pjkbzj&base=TWD&symbols=XAU%2CXAG%2CXPD%2CXPT%2CXRH', json: true })
    var usd = 1 / data.USDTWD.Exrate
    // ---------------------------------美金-----------------------------------------------------------------
    if (msg.indexOf('usd') !== -1 || msg.indexOf('美金') !== -1 || msg.indexOf('美元') !== -1) {
      const answer = (1 / data.USDTWD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '美金' + '\n' + '\n' + '1美金約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------日幣-----------------------------------------------------------------
    } else if (msg.indexOf('jpy') !== -1 || msg.indexOf('日幣') !== -1 || msg.indexOf('日元') !== -1 || msg.indexOf('日圓') !== -1) {
      const answer = (usd * data.USDJPY.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '日元' + '\n' + '\n' + '1日元約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------人民幣-----------------------------------------------------------------
    } else if (msg.indexOf('cny') !== -1 || msg.indexOf('人民幣') !== -1) {
      const answer = (usd * data.USDCNY.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '人民幣' + '\n' + '\n' + '1人民幣約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------港幣-----------------------------------------------------------------
    } else if (msg.indexOf('hkd') !== -1 || msg.indexOf('港幣') !== -1) {
      const answer = (usd * data.USDHKD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '港幣' + '\n' + '\n' + '1港幣約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------歐元-----------------------------------------------------------------
    } else if (msg.indexOf('eur') !== -1 || msg.indexOf('歐元') !== -1) {
      const answer = (usd * data.USDEUR.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '歐元' + '\n' + '\n' + '1歐元約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------澳幣-----------------------------------------------------------------
    } else if (msg.indexOf('aud') !== -1 || msg.indexOf('澳幣') !== -1) {
      const answer = (usd * data.USDAUD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '港幣' + '\n' + '\n' + '1港幣約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------英鎊-----------------------------------------------------------------
    } else if (msg.indexOf('gbp') !== -1 || msg.indexOf('英鎊') !== -1) {
      const answer = (usd * data.USDGBP.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '英鎊' + '\n' + '\n' + '1英鎊約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------加幣-----------------------------------------------------------------
    } else if (msg.indexOf('cad') !== -1 || msg.indexOf('加幣') !== -1) {
      const answer = (usd * data.USDCAD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '加幣' + '\n' + '\n' + '1加幣約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------南非幣-----------------------------------------------------------------
    } else if (msg.indexOf('zar') !== -1 || msg.indexOf('南非幣') !== -1) {
      const answer = (usd * data.USDZAR.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '南非幣' + '\n' + '\n' + '1南非幣約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------紐西蘭幣-----------------------------------------------------------------
    } else if (msg.indexOf('nzd') !== -1 || msg.indexOf('紐西蘭幣') !== -1) {
      const answer = (usd * data.USDNZD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '紐西蘭幣' + '\n' + '\n' + '1紐西蘭幣約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------瑞士法郎-----------------------------------------------------------------
    } else if (msg.indexOf('chf') !== -1 || msg.indexOf('瑞士法郎') !== -1) {
      const answer = (usd * data.USDCHF.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '瑞士法郎' + '\n' + '\n' + '1瑞士法郎約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------瑞典幣-----------------------------------------------------------------
    } else if (msg.indexOf('sek') !== -1 || msg.indexOf('瑞典幣') !== -1) {
      const answer = (usd * data.USDSEK.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '瑞典幣' + '\n' + '\n' + '1瑞典幣約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------新加坡幣-----------------------------------------------------------------
    } else if (msg.indexOf('sgd') !== -1 || msg.indexOf('新加坡幣') !== -1) {
      const answer = (usd * data.USDSGD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '新加坡幣' + '\n' + '\n' + '1新加坡幣約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------墨西哥披索-----------------------------------------------------------------
    } else if (msg.indexOf('mxn') !== -1 || msg.indexOf('披索') !== -1) {
      const answer = (usd * data.USDMXN.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '墨西哥披索' + '\n' + '\n' + '1墨西哥披索約等於' + twd + '台幣')
      console.log(answer)
      // ---------------------------------泰銖-----------------------------------------------------------------
    } else if (msg.indexOf('thb') !== -1 || msg.indexOf('泰銖') !== -1) {
      const answer = (usd * data.USDTHB.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '泰銖' + '\n' + '\n' + '1泰銖約等於' + twd + '台幣')
      console.log(answer)
      // ------------------------------貴金屬價格 https://metals-api.com/--------------------------------------------------------
    } else if (msg.indexOf('gold') !== -1 || msg.indexOf('金') !== -1) {
      const answer = golddata.rates.XAU
      event.reply('今日的金價是:' + answer)
      console.log(answer)
    } else {
      event.reply('Oops!找不到您要的資料,請再輸入一次')
    }
  } catch (error) {
    console.log(error.message)
    msg = '發生錯誤'
  }
  // event.reply('匯率是:' + answer)
  console.log(event)
})

// 在port啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
