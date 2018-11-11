const { Router } = require('express')
const controller = require('./controller')
const router = Router()
// C
router.post('/', controller.validateContent, controller.create)
// R 
router.get('/', controller.getAll)
router.get('/:id', controller.validateID, controller.getOne)
// U 
router.put('/:id', controller.validateID, controller.validateContent, controller.update)
// D
router.delete('/:id', controller.validateID, controller.delete)

module.exports = router
