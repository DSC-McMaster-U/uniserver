const express = require('express');
const router = express.Router();


import { PrismaClient } from @prisma/client;
const prisma = new PrismaClient();

import moment from 'moment';

router.use('/api/online', router);

//GET users online
router.get('/who', async(req, res) => { //api/online/who
    //Function must be async to return promise
    try{
        const status = await prisma.user.findMany({
            where: {
                online: true,
            },
        })

        res.json(status)

    }catch(e){
        console.log(e)
    }
})

//PUT Online to !Online
router.put('/change-status/:id', async(req, res) => {
    try{
        const changeStatus = await prisma.user.update({
            where: {
                status: true
            },
            data: {
                status: false,
            },

            where: {
                status: false
            },
            data: {
                status: true,
            },
        })

        res.json(changeStatus)
        
    }catch(e){
        console.log(e);
    }
})

model.exports = router;