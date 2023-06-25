const mongoose=require('mongoose')
const schema=mongoose.Schema;
const passportLocalMongoose= require('passport-local-mongoose');

const userSchema=new schema({
    username:String,
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    about:String,
    profilePicture:String,
    likedPosts:[
        {
            type:schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    dislikedPosts:[
        {
            type:schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema);