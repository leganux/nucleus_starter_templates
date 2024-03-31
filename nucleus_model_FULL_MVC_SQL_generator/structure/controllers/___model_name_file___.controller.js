let ms = require('../helpers/apiato.helper.js')
const {{_model_name_variable_}}Model = require('../models/{{_model_name_variable_}}.model')

let validationObject = {}
let populationObject = false
let options = {}
let aggregate_pipeline_dt = []
let aggregate_pipeline = []

module.exports = {
    createOne: ms.createOne({{_model_name_variable_}}Model, validationObject, populationObject, options),
    createMany: ms.createMany({{_model_name_variable_}}Model, validationObject, populationObject, options),

    getOneWhere: ms.getOneWhere({{_model_name_variable_}}Model, validationObject, populationObject, options),
    getOneById: ms.getOneById({{_model_name_variable_}}Model, validationObject, populationObject, options),
    getMany: ms.getMany({{_model_name_variable_}}Model, validationObject, populationObject, options),

    findUpdateOrCreate: ms.findUpdateOrCreate({{_model_name_variable_}}Model, validationObject, populationObject, options),
    findUpdate: ms.findUpdate({{_model_name_variable_}}Model, validationObject, populationObject, options),
    updateById: ms.updateById({{_model_name_variable_}}Model, validationObject, populationObject, options),

    findByIdAndDelete: ms.findIdAndDelete({{_model_name_variable_}}Model, options),

    datatable_aggregate: ms.datatable_aggregate({{_model_name_variable_}}Model, aggregate_pipeline_dt, ''),
    aggregate: ms.updateById({{_model_name_variable_}}Model, aggregate_pipeline, options),
}
