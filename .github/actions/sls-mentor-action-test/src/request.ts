import {IncomingMessage} from 'http'
import * as https from 'https'

type RequestOptions = {
  method: string
  headers: Record<string, string>
  body: {name: string; head_sha: string; status: string; started_at: Date}
}
type RequestOutput = {
  res: IncomingMessage
  data: Record<string, string>
}

export const request = async (
  url: string,
  options: RequestOptions
): Promise<RequestOutput> => {
  return new Promise((resolve, reject) => {
    const req = https
      .request(url, options, res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          console.log('res', res.statusCode)
          if (res.statusCode === undefined || res.statusCode >= 400) {
            const err = new Error(
              `Received status code ${res.statusCode} at url ${url}`
            )
            reject(err)
          } else {
            resolve({res, data: JSON.parse(data)})
          }
        })
      })
      .on('error', reject)
    if (options.body) {
      req.end(JSON.stringify(options.body))
    } else {
      req.end()
    }
  })
}
