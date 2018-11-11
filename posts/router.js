const { Router } = require('express')
const controller = require('./controller')
const router = Router()
// C
router.post('/', controller.validate, controller.create)
// R 
router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
// U 
router.put('/:id', controller.validate, controller.update)
// D
router.delete('/:id', controller.delete)

module.exports = router
