const Joi= require('joi')

module.exports.commentSchema = Joi.object(
    {
        comment: Joi.string().required()
    }
)