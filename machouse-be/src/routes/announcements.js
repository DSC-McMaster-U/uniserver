/*-----------------------------------------------------------API Dependencies------------------------------------------------------------------*/
const express = require("express");
const router = express.Router();

/*-----------------------------------------------------------Dependency Imports-------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import moment from "moment";

router.use("/announcements", router);

router.post("/new", async (req, res) => {
  let date = moment();

  try {
    const ann = await prisma.announce.create({
      data: {
        User_Id: req.body.userId,
        Title: req.body.title,
        Contents: req.body.content,
        Date_Posted: date.format(),
      },
    });

    res.json(ann);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

router.put("/pin", async (req, res) => {
  try {
    const pin = await prisma.$queryRawUnsafe(
      `UPDATE "Announce"
SET "Pinned"=NOT "Pinned"
WHERE "Id"=$1`,
      req.body.id
    );

    res.json(pin);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

/*
	grab 20 announcments
	prioritize pinned first
	descending date order

	SELECT 
*/
router.get("/", async (req, res) => {
  try {
    const announcements = await prisma.announce.findMany({
      select: {
        Id: true,
        Title: true,
        Contents: true,
        Date_Posted: true,
        Pinned: true,
        user: {
          select: {
            Name: true,
          },
        },
      },
      orderBy: [
        {
          Pinned: "desc",
        },
        {
          Date_Posted: "desc",
        },
      ],
    });

    res.json(announcements).status(200).send();
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

/**
 * UPDATE announcments
 * set title=req.title, content=req.content
 * where annoucement_id = req.params.id
 */
router.put("/:id", async (req, res) => {
  try {
    const updateAnnouncment = await prisma.announce.update({
      where: {
        Id: req.body.Id,
      },
      data: {
        Title: req.body.title,
        Contents: req.body.Contents,
      },
    });

    res.json(updateAnnouncment).status(200).send();
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

module.exports = router;
