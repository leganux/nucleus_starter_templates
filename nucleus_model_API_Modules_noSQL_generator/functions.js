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

            let newType = 'String'
            if (type.toLowerCase().trim() == 'number') {
                newType = 'Number'
            }
            if (type.toLowerCase().trim() == 'int') {
                newType = 'Number'
            }
            if (type.toLowerCase().trim() == 'decimal') {
                newType = 'Number'
            }
            if (type.toLowerCase().trim() == 'boolean') {
                newType = 'Boolean'
            }
            if (type.toLowerCase().trim() == 'date') {
                newType = 'Date'
            }
            if (type.toLowerCase().trim() == 'float') {
                newType = 'Number'
            }
            if (type.toLowerCase().trim() == 'objectid') {
                newType = 'Schema.Types.ObjectId'
            }
            if (type.toLowerCase().trim() == 'mixed') {
                newType = 'Schema.Types.Mixed'
            }

            let format = ` 
            ${name}: {
                type: ${newType},
                required: ${mandatory},
                customName: '${customName}',
                description: '${description}',
                isPassword: ${isPassword},
                 default: ${defaultValue},
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
