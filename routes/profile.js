const express= require('express');
const router= express.Router({mergeParams:true});
const catchAsync = require('../Utilities/catchAsync');
const profile= require('../controllers/profile');
const {isLogin,isAuthor}= require("../middlewares/middleware");
const {upload}= require("../utilities/multerStorage");

router.route('')
    .post(isLogin,upload.single('image'),catchAsync(profile.uploadPost))

router.route('/:id')
    .get(catchAsync(profile.profilePage))
    .post(isLogin,upload.single('image'),catchAsync(profile.editProfile))
    .put(catchAsync(profile.editAbout))

router.get('/:id/editAbout',isAuthor,profile.editAboutPage)
router.get('/:id/uploadProfile',isAuthor,profile.editProfilePage)

module.exports = router;