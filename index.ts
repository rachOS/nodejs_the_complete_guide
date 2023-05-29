import * as https from 'node:http';
import { requestHandler } from './routes';
import { test } from './test';

/*TODO faire le commit par chapitres ?*/

const server = https.createServer(requestHandler);

server.listen(5000);
console.log('=>(index.ts:3) before cb   ');
test((a = '123', b = 123) => console.log('test()', { a, b })).call();
