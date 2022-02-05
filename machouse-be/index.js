/*-----------------------------------------------------------API Dependencies------------------------------------------------------------------*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/*--------------------------------------------------------------Port Setup---------------------------------------------------------------------*/
const port = process.env.PORT || 3001;

/*-----------------------------------------------------------Routes File---------------------------------------------------------------------- */

const routes = require('./src/routes/routes.js');

//BodyParser Setup
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use('/api', routes);

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
