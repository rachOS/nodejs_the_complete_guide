import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import { IncomingMessage, ServerResponse } from 'http'

type HTTPRequest = InstanceType<typeof IncomingMessage>
type HTTPResponse = ServerResponse extends { new (...args: any): infer R }
  ? R
  : any & {
      req: HTTPRequest
    }
export const requestHandler = (req: HTTPRequest, res: HTTPResponse) => {
  res.setHeader('Content-type', 'text/html')
  if (req.url === '/') {
    res.write(
      '<html lang="fr">' +
        '<head>' +
        '<title>Node JS the complete guide</title>' +
        '</head>' +
        '   <body>' +
        '       <form action="/message" method="POST">' +
        '           <input type="text" name="message"/>' +
        '           <button>send</button>' +
        '       </form>' +
        '   </body>' +
        '</html>'
    )
    return res.end()
  }

  if (req.url === '/message' && req.method === 'POST') {
    const body: Uint8Array[] = []

    req.on('data', (chunk) => body.push(chunk))

    return req.on('end', () => {
      const parsedBuffer = Buffer.concat(body).toString()
      const message = parsedBuffer.split('=')[1]
      fs.writeFile('message.txt', message, (error: NodeJS.ErrnoException | null) => {
        if (error) {
          throw new Error(error.toString())
        }

        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
      })
    })
  }

  res.write(
    '<html lang="fr">' +
      '<head>' +
      '<title>Node JS the complete guide</title>' +
      '</head>' +
      '<body>' +
      '<p>Welcome to Node JS the complete Guide</p>' +
      '</body>' +
      '</html>'
  )

  return res.end()
}

export const userRoutes = (req: HTTPRequest, res: HTTPResponse): any => {
  if (req.url === '/') {
    res.write(
      '<html>' +
        '<body>' +
        `<p>Hello user! Enter your name please.</p>` +
        '<form action="/create-user" method="POST">' +
        '<label for="username"/> ' +
        '<input id="username" name="username" type="text"/>' +
        '<button type="submit">Create</button>' +
        '</form>' +
        '</body>' +
        '</html>'
    )

    return res.end()
  }

  if (req.url === '/create-user' && req.method === 'POST') {
    const body: Array<Uint8Array> = []
    req.on('data', (chunk) => body.push(chunk))

    return req.on('end', () => {
      const parsedBuffer = Buffer.concat(body).toString()
      const userName = parsedBuffer.split('=')[1]

      fs.writeFile('user.txt', userName, () => {
        console.log('=>(routes.ts:93) userName:', userName)
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
      })
    })
  }

  if (req.url === '/users') {
    res.write(
      '<html>' +
        '<body>' +
        '<ul>' +
        '<li>User 1</li>' +
        '<li>User 2</li>' +
        '<li>User 3</li>' +
        '</ul>' +
        '</body>' +
        '</html>'
    )

    return res.end()
  }

  res.write('<html>' + '<body>' + '<h1>404! PAGE NOT FOUND BRO!</h1>' + '</body>' + '</html>')

  return res.end()
}
