const express = require('express');
const router = express.Router();
const passport=require('passport');

const userController = require('../controllers/userController');
const { route } = require('.');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/createUser',userController.createUser);
router.get('/signOut',userController.signOut);
router.get('/reset',passport.checkAuthentication,userController.update);
router.post('/changePwd/:id',passport.checkAuthentication,userController.changePwd);


router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);
//use passport as a middle ware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);


module.exports = router;