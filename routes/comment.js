const express= require('express');
const router= express.Router({mergeParams:true});
const catchAsync = require('../Utilities/catchAsync');
const comment= require('../controllers/comment');

const {isLogin,isCommentAuthor}= require("../middlewares/middleware");
const {validateComment} = require('../middlewares/middleware');

router.get('/aboutus',comment.aboutUs)
router.post('/comment/:id/add',isLogin,validateComment,catchAsync(comment.addComment))
router.delete('/:pid/comment/:cid/delete',isLogin,isCommentAuthor,catchAsync(comment.deleteComment))

module.exports = router;