const User= require('../models/User');
const Post= require('../models/Post');
const Comment= require('../models/Comment');

module.exports.addComment=async(req,res)=>{
    const currentUser= await User.findById(req.user.id);
    const {id}=req.params;
    const post=await Post.findById(id);
    const {comment}=req.body;
    const newComment= new Comment({
      comment:comment,
      author:currentUser.id
    })
    await newComment.save()
    post.comments.push(newComment);
    await post.save();
    res.redirect(`/postPage/${id}`)
}

module.exports.deleteComment=async(req,res)=>{
    const {pid,cid}= req.params;
    await Post.findByIdAndUpdate(pid,{$pull : {comments:cid}});
    await Comment.findByIdAndDelete(cid);
    req.flash("success","COMMENT DELETED SUCCESSFULLY")
    res.redirect(`/postPage/${pid}`)
}

module.exports.aboutUs=(req,res)=>{
    res.render('aboutus');
  }