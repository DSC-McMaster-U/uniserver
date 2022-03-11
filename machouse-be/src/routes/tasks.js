
const express  = require('express');
const router = express.Router();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import moment from 'moment';

router.use('/tasks',router);

//GET tasks by id 
router.get('/:userid', async (req, res) => {
    try{
        let todayDate = moment().format();
        let i=0;
        const tasks = await prisma.task.findUnique({
           where: {
                 AND:[
                    {
                        User_Id:req.params.userid,
                    },
                    {
                        Date: todayDate.from(Date) <= 30,
                    },
                 ],
           }, 
        });
        res.json(tasks);
    }
    catch(e){
        console.log(e);
    }
});

module.exports = router; 

