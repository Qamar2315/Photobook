const mongoose=require('mongoose')
const schema=mongoose.Schema;

const postSchema=new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'User'
    },
    description:String,
    photo:String,
    likes:[
        {
            type:schema.Types.ObjectId,
            ref:'User'
        }
    ],
    dislikes:[
        {
            type:schema.Types.ObjectId,
            ref:'User'
        }
    ],
    comments:[
        {
            type:schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
})

module.exports=mongoose.model('Post',postSchema);