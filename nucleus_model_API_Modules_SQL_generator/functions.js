let v = require('voca')
let moment = require('moment')
module.exports = {
    field_generator: async function ({
                                         name,
                                         description,
                                         type,
                                         customName,
                                         mandatory,
                                         defaultValue,
                                         isPassword
                                     }) {

        try {
            console.log('Executing function field_generator at', moment())

            if (!name) {
                name = 'MyField_' + Math.ceil(Math.random() * 10000)
            }
            if (!description) {
                description = 'This is description for ' + name
            }
            if (!type) {
                type = 'string'
            }
            if (!customName) {
                customName = name
            }
            if (!mandatory) {
                mandatory = false
            }
            if (!isPassword) {
                isPassword = false
            }
            if (!defaultValue || defaultValue == '') {
                defaultValue = undefined
            }


            name = v.snakeCase(name.trim())
            customName = v.titleCase(customName.trim())
            newType = 'DataTypes.STRING'
            if (type.toLowerCase().trim() == 'number') {
                newType = 'DataTypes.FLOAT'
            }
            if (type.toLowerCase().trim() == 'int') {
                newType = 'DataTypes.INTEGER'
            }
            if (type.toLowerCase().trim() == 'decimal') {
                newType = 'DataTypes.DECIMAL'
            }
            if (type.toLowerCase().trim() == 'boolean') {
                newType = 'DataTypes.BOOLEAN'
            }
            if (type.toLowerCase().trim() == 'date') {
                newType = 'DataTypes.DATE'
            }
            if (type.toLowerCase().trim() == 'float') {
                newType = 'DataTypes.FLOAT'
            }
            if (type.toLowerCase().trim() == 'uuid') {
                newType = 'DataTypes.UUID'
            }

            let format = `
         ${name}: {
            type: ${newType},
            allowNull: ${!mandatory},
            field: '${name}',
            defaultValue: ${defaultValue},
            customName: '${customName}',
            description: '${description}',
            isPassword: ${isPassword}
        },
        `

            //** Important the return must be an object with info and template
            return {
                success: true,
                message: "Function executed correctly",
                template: format
            }
        } catch (e) {
            console.error('An error has been happened', e)
            return {
                success: false,
                message: e,
                template: ''
            }
        }
    },

    routes_name: async function ({api_path}) {
        if (!api_path) {
            api_path = 'api/path'
        }

        try {
            console.log('Executing function routes_name at', moment())

            api_path = v.snakeCase(api_path.trim())
            let format = `
        router.use('/${api_path}', require('./{{_model_name_variable_}}/{{_model_name_variable_}}.router'))
        `

            //** Important the return must be an object with info and template
            return {
                success: true,
                message: "Function executed correctly",
                template: format
            }
        } catch (e) {
            console.error('An error has been happened', e)
            return {
                success: false,
                message: e,
                template: ''
            }
        }
    },
   
};
