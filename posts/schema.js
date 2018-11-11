module.exports = {
    create: Joi.object().keys({
        content: Joi.string().require()
    }),
    update: Joi.object().keys({
        content: Joi.string().require(),
        id: Joi.string.alphanum().require(),
    }),
}