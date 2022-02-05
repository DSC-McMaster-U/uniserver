/*-----------------------------------------------------------API Dependencies------------------------------------------------------------------*/
const express = require('express');
const router = express.Router();

/*-----------------------------------------------------------Example Routes File--------------------------------------------------------- */
let storage = require('../models/storage');

router.use('/secondary', router);

// GET user by id
router.get('/:userid', (req, res) => {
	const user = JSON.stringify(
		storage.users.filter((e) => {
			return e.userid == Number(req.params.userid);
		})
	);
	console.log(user);
	res.send(user);
});

// POST login gets urlencoded bodies
router.post('/name', (req, res) => {
	let user = req.body;
	res.json('Hello ' + user.name);
});

module.exports = router;
