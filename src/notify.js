import request from 'request'
import querystring from 'querystring'
import dotenv from 'dotenv'
import dateFormat from 'dateformat'

dotenv.load()
const {
  TITLE, KEY, URL, TOKEN,
} = process.env
let today = new Date()
today.setDate(today.getDate() - 1)
today = dateFormat(today, 'yyyy-mm-dd')
const DAYSTARTPERIOD = today
const DAYENDPERIOD = today

const stickerPkg = 2
const stickerId = 22
let Message = ''

const query = querystring.stringify({
  start_period: DAYSTARTPERIOD,
  end_period: DAYENDPERIOD,
})

// Setup QueryString
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body)
    if (info.result.success == 'true') {
      Message += `TITLE:${TITLE}\n===Report from BOT API===\nReport Name:${info.result.data.data_header.report_name_th}\nReport Source:${info.result.data.data_header.report_source_of_data[0].source_of_data_th}\nData:${info.result.data.data_detail[0].rate} THD/USD` + `\nLast Update Timestamp:${info.result.timestamp}\nRemark:${info.result.api}`
      request(
        {
          method: 'POST',
          uri: 'https://notify-api.line.me/api/notify',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            bearer: TOKEN,
          },
          form: {
            stickerPackageId: stickerPkg,
            stickerId,
            message: Message,
          },
        },
        (err, httpResponse, body) => {
          console.log(JSON.stringify(err))
          console.log(JSON.stringify(httpResponse))
          console.log(JSON.stringify(body))
        },
      )
    } else {
      console.log('error')
    }
  }
}
const options = {
  url: URL + query,
  headers: {
    'api-key': KEY,
  },
}

request(options, callback)
