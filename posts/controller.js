const Joi = require('joi')
const schemas = require('./schema')
const model = require('./model')

module.exports = {
    validate(req, res, next) {
        let schema 
        let post
        if (req.method === 'PUT' || req.method === 'DELETE') {
            schema = schemas.update
            post = {id: req.params.id, content: req.body.content} 
        } else {
            schema = schemas.create
            post = {content: req.body.content} 
        }
        return Joi.validate(post, schema, (err, value) => {
            if (err) return next({status: 422, caught: err})
            return next()
        })
    },
    // C
    create(req, res, next) {
        return model.create(req.body)
            .then(record => {
                return res.status(201).json(record)
            })
            .catch(err => next({
                status: 422,
                message: 'Unable to process create',
                caught: err
            }))
    },
    // R
    getAll(req, res, next) {
        return model.getAll()
            .then(records => res.status(202).json(records))
            .catch(err => next({
                status: 404,
                message: 'Posts not found',
                caught: err
            }))
    },
    getOne(req,  res, next) {
        debugger
        return model.getOne(req.params.id)
            .then(record => {
                return res.status(202).json(record)
            })
            .catch(err => next({
                status: 404,
                message: 'Post not found',
                caught: err
            }))
    },
    // U 
    update(req, res, next) {
        return model.update(req.params.id, req.body)
            .then(record => res.status(201).json(record))
            .catch(err => next({
                status: 422,
                message: 'Unable to process update',
                caught: err
            }))
    },
    delete(req, res, next) {
        return model.delete(req.params.id)
            .then(deleted => res.status(202).json(deleted))
            .catch(err => next({
                status: 422,
                message: 'Unable to process update',
                caught: err
            }))

    }
}

