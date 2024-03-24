import express from 'express'
const router =  express.Router()
import ProductManager from '../controllers/productsManagerDb.js'

const productManager = new ProductManager

// Router
router.get('/', (req, res) => {
    try {
        res.render('home')
    } catch (error) {
        console.log('Error al obtener el home', error)
    }
})

router.get('/home', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render ('home', { products })
    } catch (error) {
        console.log('Error al obtener productos en getProducts', error)
    }
})

router.get('/realtimeproducts', (req,res) => {
try {
    res.render('realtimeproducts')
} catch (error) {
    console.log('Error al obtener productos en productos en tiempo real', error)
}
})

export default router