const express= require('express');
const router= express.Router({mergeParams:true});
const catchAsync = require('../Utilities/catchAsync');
const passport = require('passport');
const users= require('../controllers/users');
const { isLogin } = require('../middlewares/middleware');

router.route('/signup')
    .get(users.signupPage)
    .post(catchAsync(users.signup))

router.route('/login')
    .get(users.loginPage)
    .post(passport.authenticate('local',{falureFlash:true,failureRedirect:'/login'}),users.login)

router.get('/logout',users.logout);

module.exports=router;