module.exports = {
    content: Joi.object().keys({
        content: Joi.string().require()
    }),
    id: Joi.object().keys({
        id: Joi.string.alphanum().require(),
    }),
}