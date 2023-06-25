const User= require('../models/User');
const Post= require('../models/Post');

module.exports.postPage=async(req,res)=>{
    const {id}=req.params;
    const post=await Post.findById(id).populate('user').populate('likes').populate('dislikes').populate('comments').populate({
      path:'comments',
      populate:{
        path:'author'
      }
    });
    res.render('postPage',{post})
}

module.exports.likeHome=async(req,res)=>{
    const currentUser= await User.findById(req.user.id);
    const {id}=req.params;
    const post=await Post.findById(id).populate('likes').populate('dislikes');
    const likes=post.likes;
    const dislikes=post.dislikes;
    let isliked=false;
    let isdisliked=false;
    for(let like of likes){
      if(like.name === currentUser.name){
        isliked=true;
        break;
      }
    }
  
    for(let dislike of dislikes){
      if(dislike.name === currentUser.name){
        isdisliked=true;
        break;
      }
    }
  
    if(isliked){
      await Post.findByIdAndUpdate(id,{$pull:{likes:currentUser.id}});
    }else if(isdisliked){ 
      await Post.findByIdAndUpdate(id,{$pull:{dislikes:currentUser.id}});
      post.likes.push(currentUser.id)
      await post.save()
    }else{
      post.likes.push(currentUser.id)
      await post.save()
    }
    res.redirect('/home')
}

module.exports.like=async(req,res)=>{
    const currentUser= await User.findById(req.user.id);
    const {id}=req.params;
    const post=await Post.findById(id).populate('likes').populate('dislikes');
    const likes=post.likes;
    const dislikes=post.dislikes;
    let isliked=false;
    let isdisliked=false;
    for(let like of likes){
      if(like.name === currentUser.name){
        isliked=true;
        break;
      }
    }
  
    for(let dislike of dislikes){
      if(dislike.name === currentUser.name){
        isdisliked=true;
        break;
      }
    }
  
    if(isliked){
      await Post.findByIdAndUpdate(id,{$pull:{likes:currentUser.id}});
    }else if(isdisliked){ 
      await Post.findByIdAndUpdate(id,{$pull:{dislikes:currentUser.id}});
      post.likes.push(currentUser.id)
      await post.save()
    }else{
      post.likes.push(currentUser.id)
      await post.save()
    }
    res.redirect(`/postPage/${id}`)
}

module.exports.dislikeHome=async(req,res)=>{
    const currentUser= await User.findById(req.user.id);
    const {id}=req.params;
    const post=await Post.findById(id).populate('likes').populate('dislikes');
    const likes=post.likes;
    const dislikes=post.dislikes;
    let isliked=false;
    let isdisliked=false;
    for(let like of likes){
      if(like.name === currentUser.name){
        isliked=true;
        break;
      }
    }
    for(let dislike of dislikes){
      if(dislike.name === currentUser.name){
        isdisliked=true;
        break;
      }
    }
    if(isliked){
      await Post.findByIdAndUpdate(id,{$pull:{likes:currentUser.id}});
      post.dislikes.push(currentUser.id)
      await post.save()
    }else if(isdisliked){ 
      await Post.findByIdAndUpdate(id,{$pull:{dislikes:currentUser.id}});
    }else{
      post.dislikes.push(currentUser.id)
      await post.save()
    }
    res.redirect('/home')
}

module.exports.dislike=async(req,res)=>{
    const currentUser= await User.findById(req.user.id);
    const {id,t}=req.params;
    const post=await Post.findById(id).populate('likes').populate('dislikes');
    const likes=post.likes;
    const dislikes=post.dislikes;
    let isliked=false;
    let isdisliked=false;
    for(let like of likes){
      if(like.name === currentUser.name){
        isliked=true;
        break;
      }
    }
  
    for(let dislike of dislikes){
      if(dislike.name === currentUser.name){
        isdisliked=true;
        break;
      }
    }
  
    if(isliked){
      await Post.findByIdAndUpdate(id,{$pull:{likes:currentUser.id}});
      post.dislikes.push(currentUser.id)
      await post.save()
    }else if(isdisliked){ 
      await Post.findByIdAndUpdate(id,{$pull:{dislikes:currentUser.id}});
    }else{
      post.dislikes.push(currentUser.id)
      await post.save()
    }
    res.redirect(`/postPage/${id}`)
}