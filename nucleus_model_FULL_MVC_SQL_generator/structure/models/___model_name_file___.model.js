let {Sequelize, DataTypes, sequelize} = require('./../db/connection')

const {UUIDV4} = require('sequelize');
const moment = require('moment');


const {{_model_name_variable_}} = sequelize.define('{{_model_name_variable_}}', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: '_id',
    },
    {$_field_generator_$}
}, {
    tableName: '{{_model_name_variable_}}s',
    timestamps: true,
});


{{_model_name_variable_}}.sync({alter: true});


module.exports = {{_model_name_variable_}};
