import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import { IncomingMessage, ServerResponse } from 'http';

type HTTPRequest = InstanceType<typeof IncomingMessage>;
type HTTPResponse = ServerResponse extends { new (...args: any): infer R }
  ? R
  : any & {
      req: HTTPRequest;
    };
export const requestHandler = (req: HTTPRequest, res: HTTPResponse) => {
  res.setHeader('Content-type', 'text/html');
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
    );
    return res.end();
  }

  if (req.url === '/message' && req.method === 'POST') {
    const body: Uint8Array[] = [];

    req.on('data', chunk => body.push(chunk));

    return req.on('end', () => {
      const parsedBuffer = Buffer.concat(body).toString();
      const message = parsedBuffer.split('=')[1];
      fs.writeFile(
        'message.txt',
        message,
        (error: NodeJS.ErrnoException | null) => {
          if (error) {
            throw new Error(error.toString());
          }

          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        }
      );
    });
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
  );

  return res.end();
};
