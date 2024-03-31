const mongoose = require('mongoose')
const moment = require('moment')

const {Schema} = mongoose;

const {{_model_name_variable_}}Model = new Schema({
{$_field_generator_$}
}, {
    timestamps: true
})


module.exports = mongoose.model('{{_model_name_variable_}}', {{_model_name_variable_}}Model)

