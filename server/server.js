import path from 'path';
import express from 'express';

import { MongoClient } from 'mongodb';

import compile from './devBundle';
import template from '../template';

const CWD = process.cwd();
const app = express();

const url =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';

const port = process.env.PORT || 3001;

app.use('/dist', express.static(path.join(CWD, 'dist')));
app.get('/', (req, res) => {
	res.status(200).send(template());
});

(async () => {
	const client = new MongoClient(url);
	await client.connect();
})();

// MongoClient.connect(url, (err, db) => {
// 	console.log('connected to Mongo Server');
// 	db.close();
// });

app.listen(port, err => {
	if (err) {
		console.error(err);
	}

	console.info(`Server started on port ${port}`);
});

compile(app);
