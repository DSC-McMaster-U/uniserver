/*-----------------------------------------------------------API Dependencies------------------------------------------------------------------*/
import express from 'express';
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

/*--------------------------------------------------------------Port Setup---------------------------------------------------------------------*/
const port = process.env.PORT || 3001;

/*-----------------------------------------------------------Routes File---------------------------------------------------------------------- */

import routes from './src/routes/routes.js';

// Cross Origin Setup
app.use(cors());

// BodyParser Setup
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// Routes setup
app.use('/api', routes);

let http = require('http');
let path = require('path');

// Root Route - Returns a string 'OK'
app.get('/', (req, res) => {
	res.json({ 'message': 'OK' });
});

// Error handling
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ 'message': err.message });

	return;
});

// Listen on port 3000 or whichever free port the hardware chooses - triggered by running 'npm start' (see package.json for more info)
app.listen(port, '0.0.0.0', () => {
	console.log(`Example app listening at http://localhost:${port}`); // easy link for dev
});
