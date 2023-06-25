const User= require('../models/User');
const Post= require('../models/Post');
const Comment= require('../models/Comment');
const fs = require('fs');


module.exports.homepage= async(req,res)=>{
    const posts= await Post.find({}); 
    for(let post of posts){
      await post.populate('user')
      await post.populate('likes')
      await post.populate('dislikes')
    }
    res.render('home',{posts});
}

module.exports.uploadPost=async(req,res)=>{ 
    const user= await User.findById(req.user.id);
    const {description}=req.body;
    const img=req.file.filename;
    const post={
        user:user.id,
        description:description,
        photo:img,
        likes:[],
        dislikes:[],
        comments:[]
      }
      const newPost= new Post(post);
      await newPost.save();
      console.log(newPost);
      req.flash("success","POSTED SUCCESSFULLY");
      res.redirect('/home');
}

module.exports.deletePost=async(req,res)=>{
    const {id}=req.body;
    const post=await Post.findById(id);
    //console.log(post);
    for(let com of post.comments){
      await Comment.findByIdAndDelete(com._id);
    }
    try {
      fs.unlinkSync(`C:/Users/Dell/OneDrive/Desktop/qamar/Projects/PhotoBook/public/uploads/${post.photo}`);
      //file removed
    } catch(err) {
      console.error(err);
    }
    await Post.findByIdAndDelete(id);
    req.flash("success","POST DELETED");
    res.redirect(`/profile/${req.user.id}`);
  }