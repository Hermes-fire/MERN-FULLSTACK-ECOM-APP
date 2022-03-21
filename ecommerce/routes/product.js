const express = require('express')
const router = express.Router()


const { requireSignin, isAuth, isAdmin }= require('../controllers/auth')
const { userById} = require('../controllers/user')
const {productById, create, read, remove, update, list, listRelated, listCategories, listBySearch, photo} =require('../controllers/product')



router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.get('/product', list)
router.get('/product/related/:productId', listRelated)
router.get('/product/listrelated/categories', listCategories)
router.post("/product/by/search", listBySearch);
router.get('/product/photo/:productId', photo)


router.param('productId', productById)
router.param('userId', userById)




module.exports = router