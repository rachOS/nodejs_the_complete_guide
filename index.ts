import * as https from 'node:http';
import * as fs from 'node:fs';
import { Buffer } from 'buffer';

/*TODO faire le commit par chapitres ?*/

const server = https.createServer((req, res) => {
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
    const body: any[] = [];

    req.on('data', chunk => body.push(chunk));
    return req.on('end', () => {
      const parsedBuffer = Buffer.concat(body).toString();
      const message = parsedBuffer.split('=')[1];
      fs.writeFile('message.txt', message, error => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
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
});

server.listen(5000);
server.on('connect', (req, socket, head) =>
  console.log('connect', { req, socket, head })
);
