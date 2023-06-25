const User= require('../models/User');
const Post= require('../models/Post');
const fs = require('fs');

module.exports.editAboutPage = (req,res)=>{
    res.render('editAbout');
}

module.exports.editAbout=async (req,res)=>{
    const {id}= req.params;
    const {description}=req.body;
    const user=await User.findById(id);
    user.about=description;
    await user.save();
    req.flash("success","SUCCESSFULLY UPDATED ABOUT");
    res.redirect(`/profile/${id}`);
}

module.exports.editProfilePage = (req,res)=>{
    res.render('editProfile');
}

module.exports.editProfile=async (req,res)=>{
    const {id}= req.params;
    const user=await User.findById(id);
    try {
      fs.unlinkSync(`C:/Users/Dell/OneDrive/Desktop/qamar/Projects/PhotoBook/public/uploads/${user.profilePicture}`);
      //file removed
    } catch(err) {
      console.error(err);
    }
    // user.about=description;
    user.profilePicture=req.file.filename;
    await user.save();
    req.flash("success","PROFILE UPLOADED SUCCESSFULLY");
    res.redirect(`/profile/${id}`);
}

module.exports.profilePage= async(req,res)=>{
    const {id}=req.params;
    const posts=await Post.find({user:id});
    const user= await User.findById(id);
    for(let post of posts){
      await post.populate('user')
      await post.populate('likes')
      await post.populate('dislikes')
    }
    res.render('profile',{posts,user});
}

module.exports.uploadPost=async(req,res)=>{ 
    const user= await User.findById(req.user.id);
    const {description}=req.body;
    const post={
        user:user.id,
        description:description,
        photo:req.file.filename,
        likes:[],
        dislikes:[],
        comments:[]
      }
      const newPost= new Post(post);
      await newPost.save();
      req.flash("success","POST UPLOADED");
      res.redirect(`/profile/${req.user.id}`);
}
