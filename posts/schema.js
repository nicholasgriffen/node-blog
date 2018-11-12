const Joi = require('joi')
module.exports = {
    content: Joi.object().keys({
        content: Joi.string().required()
    }),
    ID: Joi.object().keys({
        id: Joi.string().guid().required(),
    }),
}