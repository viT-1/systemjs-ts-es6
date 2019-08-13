import express from 'express';
import path from 'path';

import { conf } from './express.node.conf';

// Не выдаёт ошибок, если в tsconfig указано, что соберём commonjs
import appConf from '../app.conf';

const { port } = conf;
const app = express();
app.use(express.static(
	path.resolve(appConf.rootFolderPath, appConf.destFolderName),
	{ cacheControl: false },
));

const absEntry = path.resolve(
	appConf.rootFolderPath,
	appConf.destFolderName,
	appConf.entryFileName,
);

app.get('/', (req, res): void => {
	res.sendFile(absEntry);
	// res.send(absEntry);
});

const server = app.listen(port, (): void => {
	console.log(`Example app listening on port ${port}!`);
});

// @link: https://flaviocopes.com/node-terminate-program/
process.on('SIGTERM', (): void => {
	server.close((): void => {
		console.log('Process terminated');
	});
});
