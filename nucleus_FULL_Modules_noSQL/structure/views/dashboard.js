const express = require('express')
const router = express.Router()

let assets = require('./../config/assets.config')
let menu = require('./../config/menu.config')
let datatableHelper = require('./../helpers/datatable.helper')
let userModel = require('../modules/user/user.model')
let configModel = require('../modules/configuration/configuration.model')

let middlewareSession = require('../modules/auth/functions.auth').middleware

let baseUrl = '/cdn/dashboard/'


router.get('/', middlewareSession, async function (req, res) {
    let myAssets = new assets()
    myAssets = myAssets.getAssetsAdmin()


    res.status(200).render('dashboard/dashboard', {
        ...myAssets, ...menu,
        title: 'Welcome',
        breadcrubs: [
            {
                title: 'Welcome',
                href: '/dashboard',
                active: true

            }
        ]
    })
})

router.get('/login', async function (req, res) {
    let myAssets = new assets()
    myAssets = myAssets.getAssetsAdmin()
    myAssets.styles.push(baseUrl + 'dist/css/adminlte.min.css')
    myAssets.scripts.push(baseUrl + 'dist/js/adminlte.min.js')
    myAssets.scripts.push('/cdn/components/login.js')
    res.status(200).render('dashboard/login', {
        ...myAssets,
        title: 'Nucleus :: Login',

    })
})

router.get('/demo', middlewareSession, async function (req, res) {

    let myAssets = new assets()
    myAssets = myAssets.getAssetsAdmin()
    /* custom assets**/
    myAssets.scripts.push(baseUrl + 'dist/js/demo.js')
    myAssets.scripts.push(baseUrl + 'dist/js/pages/dashboard2.js')

    res.status(200).render('dashboard/demo', {
        ...myAssets, ...menu,
        title: 'Welcome',
        breadcrubs: [
            {
                title: 'Welcome',
                href: '/dashboard',
                active: false

            }, {
                title: 'Demo',
                href: '/dashboard/demo',
                active: true

            }
        ]

    })
})
router.get('/users', middlewareSession, async function (req, res) {
    let myAssets = new assets()
    myAssets = myAssets.getAssetsAdmin()
    /* custom assets**/
    myAssets.scripts.push('/cdn/components/code-rag.sdk.js')
    myAssets.scripts.push('/cdn/components/datatable.js')


    let datatable = await datatableHelper.dt_constructor({model: userModel, actions: 'Create,Update,read,delete'})


    res.status(200).render('dashboard/users', {
        ...myAssets,
        ...menu,
        title: 'Users',
        breadcrubs: [
            {
                title: 'Welcome',
                href: '/dashboard',
                active: false

            },
            {
                title: 'Users',
                href: '/dashboard/users',
                active: true

            }
        ],
        datatable,
        toJS: JSON.stringify({
            datatable,
            user: req?.session?.user || null,
            api_token: req?.session?.token || null
        })

    })
})

/** Here routes*/

router.get('/*', middlewareSession, async function (req, res) {
    let myAssets = new assets()
    myAssets = myAssets.getAssetsAdmin()
    /* custom assets**/
    res.status(200).render('dashboard/404', {
        ...myAssets,

        title: '404',


        toJS: JSON.stringify({})

    })
})



module.exports = router
