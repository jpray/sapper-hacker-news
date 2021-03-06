import fs from 'fs';
import express from 'express';
import compression from 'compression';
import sapper from 'sapper';
import serve from 'serve-static';
import { routes } from './manifest/server.js';

const { PORT = 3000 } = process.env;

const app = express();

const fetch = require('node-fetch');
global.fetch = (url, opts) => {
	if (url[0] === '/') url = `http://localhost:${PORT}${url}`;
	return fetch(url, opts);
};

app.use(compression({ threshold: 0 }));

app.use(serve('assets'));

app.use(sapper({
	routes
}));

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});