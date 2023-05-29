import * as https from 'node:http';
import { requestHandler } from './routes';

/*TODO faire le commit par chapitres ?*/

const server = https.createServer(requestHandler);

server.listen(5000);
