const Joi = require('joi')
module.exports = {
    content: Joi.object().keys({
        content: Joi.string().guid().required()
    }),
    ID: Joi.object().keys({
        id: Joi.string().alphanum().required(),
    }),
}