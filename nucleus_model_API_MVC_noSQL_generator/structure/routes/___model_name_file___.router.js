const express = require('express')
const router = express.Router()

let {{_model_name_variable_}}Controller = require('../controllers/{{_model_name_variable_}}.controller')

router.post('/', {{_model_name_variable_}}Controller.createOne)
router.post('/many', {{_model_name_variable_}}Controller.createMany)


router.get('/one', {{_model_name_variable_}}Controller.getOneWhere)
router.get('/many', {{_model_name_variable_}}Controller.getMany)
router.get('/:id', {{_model_name_variable_}}Controller.getOneById)

router.put('/find_update_or_create', {{_model_name_variable_}}Controller.findUpdateOrCreate)
router.put('/find_where_and_update', {{_model_name_variable_}}Controller.findUpdate)
router.put('/:id', {{_model_name_variable_}}Controller.updateById)

router.delete('/:id', {{_model_name_variable_}}Controller.findByIdAndDelete)

router.post('/datatable', {{_model_name_variable_}}Controller.datatable_aggregate)
router.post('/aggregate', {{_model_name_variable_}}Controller.aggregate)

module.exports = router
