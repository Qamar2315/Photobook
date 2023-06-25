const express= require('express');
const router= express.Router({mergeParams:true});
const catchAsync = require('../Utilities/catchAsync');
const post= require('../controllers/post');
const {isLogin}= require("../middlewares/middleware");

router.get('/postPage/:id',isLogin,catchAsync(post.postPage))
router.post('/:id/like',isLogin,catchAsync(post.likeHome))
router.post('/:id/like/home',isLogin,catchAsync(post.like))
router.post('/:id/dislike',isLogin,catchAsync(post.dislikeHome))
router.post('/:id/dislike/home',isLogin,catchAsync(post.dislike))

module.exports = router;