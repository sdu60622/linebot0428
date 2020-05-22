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
    // API來源:全球即時匯率API https://tw.rter.info/
    const data = await rp({ uri: 'https://tw.rter.info/capi.php', json: true })
    var usd = 1 / data.USDTWD.Exrate
    // ---------------------------------美金-----------------------------------------------------------------
    if (msg.search(/(@((美元)|(美金)|(usd)))/) !== -1) {
      const answer = (1 / data.USDTWD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '美金' + '\n' + '\n' + '1美金約等於' + twd + '台幣')
    } else if (msg.search(/!usd/) !== -1) {
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * usd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '美金' })
      // ------------------------------台幣換美金--------------------------------------------------------------------------
    } else if (msg.search(/usd!/) !== -1) {
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * data.USDTWD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '美金可換' + '\n' + '\n' + change + '台幣' })
      // ------------------------------美金換台幣--------------------------------------------------------------------------
      // ---------------------------------日幣-----------------------------------------------------------------
    } else if (msg.search(/(@((日幣)|(日元)|(jpy)))/) !== -1) {
      const answer = (usd * data.USDJPY.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '日元' + '\n' + '\n' + '1日元約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!jpy/) !== -1) {
      const answer = usd * data.USDJPY.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '日幣' })
      // ------------------------------台幣換日幣--------------------------------------------------------------------------
    } else if (msg.search(/jpy!/) !== -1) {
      const answer = usd * data.USDJPY.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '日幣可換' + '\n' + '\n' + change + '台幣' })
      // ------------------------------日幣換台幣--------------------------------------------------------------------------
      // ---------------------------------人民幣-----------------------------------------------------------------
    } else if (msg.search(/(@((人民幣)|(cny)))/) !== -1) {
      const answer = (usd * data.USDCNY.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '人民幣' + '\n' + '\n' + '1人民幣約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!cny/) !== -1) {
      const answer = usd * data.USDCNY.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '人民幣' })
      // ------------------------------台幣換人民幣--------------------------------------------------------------------------
    } else if (msg.search(/cny!/) !== -1) {
      const answer = usd * data.USDCNY.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '人民幣可換' + '\n' + '\n' + change + '台幣' })
      // ------------------------------人民幣換台幣--------------------------------------------------------------------------
      // ---------------------------------港幣-----------------------------------------------------------------
    } else if (msg.search(/(@((港元)|(港幣)|(hkd)))/) !== -1) {
      const answer = (usd * data.USDHKD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '港幣' + '\n' + '\n' + '1港幣約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!hkd/) !== -1) {
      const answer = usd * data.USDHKD.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '港幣' })
      // ------------------------------台幣換港幣--------------------------------------------------------------------------
    } else if (msg.search(/hkd!/) !== -1) {
      const answer = usd * data.USDHKD.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '港幣可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------港幣換台幣-------------------------------------------------------------
      // ---------------------------------歐元-----------------------------------------------------------------
    } else if (msg.search(/(@((歐元)|(eur)))/) !== -1) {
      const answer = (usd * data.USDEUR.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '歐元' + '\n' + '\n' + '1歐元約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!eur/) !== -1) {
      const answer = usd * data.USDHKD.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '歐元' })
      // ------------------------------台幣換歐元--------------------------------------------------------------------------
    } else if (msg.search(/eur!/) !== -1) {
      const answer = usd * data.USDHKD.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '歐元可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------歐元換台幣-------------------------------------------------------------
      // ---------------------------------澳幣-----------------------------------------------------------------
    } else if (msg.search(/(@((澳元)|(澳幣)|(aud)))/) !== -1) {
      const answer = (usd * data.USDAUD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '澳元' + '\n' + '\n' + '1澳元約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!aud/) !== -1) {
      const answer = usd * data.USDAUD.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '澳元' })
      // ------------------------------台幣換澳幣--------------------------------------------------------------------------
    } else if (msg.search(/aud!/) !== -1) {
      const answer = usd * data.USDAUD.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '澳元可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------港幣換台幣-------------------------------------------------------------
      // ---------------------------------英鎊-----------------------------------------------------------------
    } else if (msg.search(/(@((英鎊)|(gbp)))/) !== -1) {
      const answer = (usd * data.USDGBP.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '英鎊' + '\n' + '\n' + '1英鎊約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!gbp/) !== -1) {
      const answer = usd * data.USDGBP.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '英鎊' })
      // ------------------------------台幣換英鎊--------------------------------------------------------------------------
    } else if (msg.search(/gbp!/) !== -1) {
      const answer = usd * data.USDGBP.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '英鎊可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------英鎊換台幣-------------------------------------------------------------
      // ---------------------------------加幣-----------------------------------------------------------------
    } else if (msg.search(/(@((加幣)|(cad)))/) !== -1) {
      const answer = (usd * data.USDCAD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '加幣' + '\n' + '\n' + '1加幣約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!cad/) !== -1) {
      const answer = usd * data.USDCAD.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '加幣' })
      // ------------------------------台幣換加幣--------------------------------------------------------------------------
    } else if (msg.search(/cad!/) !== -1) {
      const answer = usd * data.USDHKD.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '加幣可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------加幣換台幣-------------------------------------------------------------
      // ---------------------------------南非幣-----------------------------------------------------------------
    } else if (msg.search(/(@((南非幣)|(zar)))/) !== -1) {
      const answer = (usd * data.USDZAR.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '南非幣' + '\n' + '\n' + '1南非幣約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!zar/) !== -1) {
      const answer = usd * data.USDZAR.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '南非幣' })
      // ------------------------------台幣換南非幣--------------------------------------------------------------------------
    } else if (msg.search(/zar!/) !== -1) {
      const answer = usd * data.USDZAR.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '南非幣可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------南非幣換台幣-------------------------------------------------------------
      // ---------------------------------紐西蘭幣-----------------------------------------------------------------
    } else if (msg.search(/(@((紐西蘭幣)|(紐幣)|(zar)))/) !== -1) {
      const answer = (usd * data.USDNZD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '紐西蘭幣' + '\n' + '\n' + '1紐西蘭幣約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!nzd/) !== -1) {
      const answer = usd * data.USDNZD.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '紐幣' })
      // ------------------------------台幣換港幣--------------------------------------------------------------------------
    } else if (msg.search(/nzd!/) !== -1) {
      const answer = usd * data.USDNZD.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '紐幣可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------港幣換台幣-------------------------------------------------------------
      // ---------------------------------瑞士法郎-----------------------------------------------------------------
    } else if (msg.search(/(@((瑞士法郎)|(法郎)|(chf)))/) !== -1) {
      const answer = (usd * data.USDCHF.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '瑞士法郎' + '\n' + '\n' + '1瑞士法郎約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!chf/) !== -1) {
      const answer = usd * data.USDCHF.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '瑞士法郎' })
      // ------------------------------台幣換瑞士法郎--------------------------------------------------------------------------
    } else if (msg.search(/chf!/) !== -1) {
      const answer = usd * data.USDCHF.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '瑞士法郎可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------港幣換台幣-------------------------------------------------------------
      // ---------------------------------瑞典幣-----------------------------------------------------------------
    } else if (msg.search(/(@((瑞典幣)|(sek)))/) !== -1) {
      const answer = (usd * data.USDSEK.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '瑞典幣' + '\n' + '\n' + '1瑞典幣約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!sek/) !== -1) {
      const answer = usd * data.USDSEK.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '瑞典幣' })
      // ------------------------------台幣換瑞典幣--------------------------------------------------------------------------
    } else if (msg.search(/sek!/) !== -1) {
      const answer = usd * data.USDSEK.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '瑞典幣可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------瑞典幣換台幣-------------------------------------------------------------
      // ---------------------------------新加坡幣-----------------------------------------------------------------
    } else if (msg.search(/(@((新加坡幣)|(新幣)|(SGD)))/) !== -1) {
      const answer = (usd * data.USDSGD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '新加坡幣' + '\n' + '\n' + '1新加坡幣約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!sgd/) !== -1) {
      const answer = usd * data.USDSGD.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '新加坡幣' })
      // ------------------------------台幣換新加坡幣--------------------------------------------------------------------------
    } else if (msg.search(/sgd!/) !== -1) {
      const answer = usd * data.USDSGD.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '新加坡幣可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------新加坡幣換台幣-------------------------------------------------------------
      // ---------------------------------墨西哥披索-----------------------------------------------------------------
    } else if (msg.search(/(@((墨西哥披索)|(墨西哥幣)|(mxn)))/) !== -1) {
      const answer = (usd * data.USDMXN.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '墨西哥披索' + '\n' + '\n' + '1墨西哥披索約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!mxn/) !== -1) {
      const answer = usd * data.USDMXN.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '墨西哥披索' })
      // ------------------------------台幣換墨西哥披索--------------------------------------------------------------------------
    } else if (msg.search(/mxn!/) !== -1) {
      const answer = usd * data.USDMXN.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '墨西哥披索可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------墨西哥披索換台幣-------------------------------------------------------------
      // ---------------------------------泰銖-----------------------------------------------------------------
    } else if (msg.search(/(@((泰銖)|(thb)))/) !== -1) {
      const answer = (usd * data.USDTHB.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (1 / answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日匯率:' + '\n' + '\n' + '1台幣約等於' + answer + '泰銖' + '\n' + '\n' + '1泰銖約等於' + twd + '台幣')
      console.log(answer)
    } else if (msg.search(/!thb/) !== -1) {
      const answer = usd * data.USDTHB.Exrate
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * answer).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '台幣可換' + '\n' + '\n' + change + '泰銖' })
      // ------------------------------台幣換泰銖--------------------------------------------------------------------------
    } else if (msg.search(/thb!/) !== -1) {
      const answer = usd * data.USDTHB.Exrate
      const twd = 1 / answer
      const str1 = event.message.text
      const arr = str1.split(/[a-zA-Z@!]/)
      const len = arr.length
      let str2 = ''
      for (let i = 0; i < len; i++) {
        str2 += arr[i]
        break
      }
      const change = (str2 * twd).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply({ type: 'text', text: str2 + '泰銖可換' + '\n' + '\n' + change + '台幣' })
      // -----------------------------泰銖換台幣-------------------------------------------------------------
      // ------------------------------貴金屬價格 https://metals-api.com/--------------------------------------------------------
    } else if (msg.search(/(@((黃金)|(gold)|(xau)))/) !== -1) {
      const golddata = await rp({ uri: 'https://metals-api.com/api/latest?access_key=6h7lwogcranbxq47lvjb7b9r95n7bi3qjfxbaso4eu2qbm6qw346grq40azr', json: true })
      const answer = (1 / golddata.rates.XAU).toString().match(/^\d+(?:\.\d{0,3})?/)
      const tw = (answer / 28.4).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (tw * data.USDTWD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日的黃金價是:' + '\n' + '\n' + '1盎司約' + answer + '美元' + '\n' + '\n' + '1g約' + tw + '美元' + '\n' + '\n' + '1g約' + twd + '台幣' + '\n' + '\n' + '*以1盎司=28.4公克計算')
      console.log(answer)
    } else if (msg.search(/(@((白金)|(xpt)))/) !== -1) {
      const golddata = await rp({ uri: 'https://metals-api.com/api/latest?access_key=6h7lwogcranbxq47lvjb7b9r95n7bi3qjfxbaso4eu2qbm6qw346grq40azr', json: true })
      const answer = (1 / golddata.rates.XPT).toString().match(/^\d+(?:\.\d{0,3})?/)
      const tw = (answer / 28.4).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (tw * data.USDTWD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日的白金價是:' + '\n' + '\n' + '1盎司約' + answer + '美元' + '\n' + '\n' + '1g約' + tw + '美元' + '\n' + '\n' + '1g約' + twd + '台幣' + '\n' + '\n' + '*以1盎司=28.4公克計算')
      console.log(answer)
    } else if (msg.search(/(@((鈀金)|(xpd)))/) !== -1) {
      const golddata = await rp({ uri: 'https://metals-api.com/api/latest?access_key=6h7lwogcranbxq47lvjb7b9r95n7bi3qjfxbaso4eu2qbm6qw346grq40azr', json: true })
      const answer = (1 / golddata.rates.XPD).toString().match(/^\d+(?:\.\d{0,3})?/)
      const tw = (answer / 28.4).toString().match(/^\d+(?:\.\d{0,3})?/)
      const twd = (tw * data.USDTWD.Exrate).toString().match(/^\d+(?:\.\d{0,3})?/)
      event.reply('今日的鈀金價是:' + '\n' + '\n' + '1盎司約' + answer + '美元' + '\n' + '\n' + '1g約' + tw + '美元' + '\n' + '\n' + '1g約' + twd + '台幣' + '\n' + '\n' + '*以1盎司=28.4公克計算')
      console.log(answer)
    } else {
      event.reply('Oops!找不到您要的資料,請再輸入一次')
    }
  } catch (error) {
    console.log(error.message)
    msg = '發生錯誤'
  }
  console.log(event)
})

// 在port啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
