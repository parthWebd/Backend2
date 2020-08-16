const express=require('express');
const router=express.Router();

const home_controller=require('../controllers/homeController');

router.get('/',home_controller.home);
router.use('/users',require('./user'));

console.log('Router is Running');

module.exports=router;