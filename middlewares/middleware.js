const User= require('../models/User');
const Post= require('../models/Post');
const Comment= require('../models/Comment');
const {commentSchema}= require('../schemas/schemas');
const AppError=require('../utilities/AppError')

module.exports.isLogin= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','YOU MUST BE LOGIN');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor= async(req,res,next)=>{
    const {id}= req.params;
    const user= await User.findById(id);
    if(user._id != req.user.id){
        req.flash('error','you donot have permission to do that')
        return res.redirect(`/profile/${id}`)
    }
    next();
}

module.exports.isPostAuthor= async(req,res,next)=>{
    const {id}= req.body;
    const post= await Post.findById(id);
    const user= post.user;
    if(user._id != req.user.id){
        req.flash('error','you donot have permission to do that')
        return res.redirect(`/profile/${id}`)
    }
    next();
}

module.exports.isCommentAuthor= async(req,res,next)=>{
    const {cid}= req.params;
    const comment= await Comment.findById(cid);
    const user= comment.author;
    if(user._id != req.user.id){
        req.flash('error','you donot have permission to do that')
        return res.redirect(`/profile/${id}`)
    }
    next();
}

module.exports.validateComment= (req,res,next)=>{
    console.log(req.body);
    const {error}= commentSchema.validate(req.body);
    if(error){
        const msg= error.details.map(el=> el.message).join(',');
        throw new AppError(msg,400);
    }else{
        next()
    }
}