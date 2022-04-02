/*-----------------------------------------------------------API Dependencies------------------------------------------------------------------*/
const express = require('express');
const router = express.Router();

/*-----------------------------------------------------------Dependency Imports-------------------------------------------------------- */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import moment from 'moment';

router.use('/user', router);

// GET user by id
router.get('/:id', async (req, res) => {
	// api/user/USER_ID_NUMBER
	// function must be async to return promise
	try {
		const user = await prisma.user.findUnique({
			where: {
				Id: Number(req.params.id),
			},
		});
		res.json(user);
	} catch (e) {
		console.log(e);
	}
});

// POST new user account
router.post('/add', async (req, res) => {
	// api/user/add
	let userData = req.body;
	let date = moment();

	try {
		const user = await prisma.user.create({
			data: {
				Name: req.body.name,
				Email: req.body.email,
				Online: true,
				Last_online: date.format(),
			},
		});
		res.json(user);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
