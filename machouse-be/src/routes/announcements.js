/*-----------------------------------------------------------API Dependencies------------------------------------------------------------------*/
const express = require('express');
const router = express.Router();

/*-----------------------------------------------------------Dependency Imports-------------------------------------------------------- */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import moment from 'moment';

router.use('/announcements', router);

router.post('/new', async (req, res) => {
	let date = moment();

	try {
		const ann = await prisma.announce.create({
			data: {
				User_Id: req.body.userId,
				Contents: req.body.content,
				Date_Posted: date.format(),
			},
		});

		res.json(ann);
	} catch (e) {
		console.log(e);
	}
});

router.put('/pin', async (req, res) => {
	try {
		const pin = await prisma.$queryRawUnsafe(
			`UPDATE "Announce"
SET "Pinned"='true'
WHERE "Id"=$1`,
			req.body.id
		);

		res.json(pin);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
