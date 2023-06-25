const mongoose=require('mongoose')
const schema=mongoose.Schema;

const commentSchema=new schema({
    comment:String,
    author:{
        type:schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports=mongoose.model('Comment',commentSchema);