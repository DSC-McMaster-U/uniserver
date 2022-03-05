import express from 'express';
const router = express.Router();

// require "import" your exported route using the same syntax as the line below
let user = require('./user');
let tasks = require('./tasks');

// Add your route here using the same sytax as seen on the line below
router.use('/user', user);
router.use('/tasks',tasks);

// DO NOT CHANGE
export default router;
