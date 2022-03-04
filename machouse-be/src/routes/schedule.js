/*-----------------------------------------------------------API Dependencies------------------------------------------------------------------*/
const express = require('express');
const router = express.Router();

/*-----------------------------------------------------------Dependency Imports-------------------------------------------------------- */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

router.use('/schedule', router);

// GET event schedule by date
router.get('/:date', async (req, res) => {
	// api/schedule/DATE (Date in the format YYYY-MM-DD)
	try {
		const events = await prisma.event.findMany({
			where: {
				Time: {
                    gte: new Date(req.params.date),
                    lt: (() => {
						let endDate = new Date(req.params.date);
						endDate.setDate(endDate.getDate() + 1);
						return endDate;
					})()
                  },
			},
		});
		res.json(events);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
