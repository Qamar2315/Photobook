const express= require('express');
const router= express.Router({mergeParams:true});
const catchAsync = require('../Utilities/catchAsync');
const home= require('../controllers/home');
const {isLogin, isPostAuthor}= require("../middlewares/middleware");
const {upload}= require("../utilities/multerStorage");

router.route('')
    .get(isLogin,catchAsync(home.homepage))
    .post(isLogin,upload.single('image'),catchAsync(home.uploadPost))
    .delete(isLogin,isPostAuthor,catchAsync(home.deletePost))

module.exports = router;