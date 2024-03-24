
import express from 'express'
const router = express.Router()
import CartManager from "../controllers/cartManagerDb.js"
import CartModel from '../models/cart.model.js'


const cartManager = new CartManager()
const cartModel = new CartModel() 


router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.status(200).json(carts)
    } catch (error) {
        console.log('Error al obtener carritos', error)
        res.status(500).send('Error al obtener carritos')
    }
})

// Route to create a new cart
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json(newCart)
    } catch (error) {
        console.log('Error al crear el carrito', error)
        res.status(500).send('Error al crear el carrito')
    }
})

// Route to get a specific cart by its ID (cid)
router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    try {
        const cart = await cartManager.getCartById(cid)
        if (cart) {
            res.status(200).json(cart.products)
        } else {
            res.status(404).send(`ID del carrito ${cid} no encontrado`)
        }
    } catch (error) {
        console.log(`Error al obtener el carrito por ID ${cid}`, error)
        res.status(500).send(`Error al obtener el carrito por ID ${cid}`)
    }
})

// Route to add a product to a specific cart
router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity || 1

    try {
        const updatedCart = await cartManager.addProductToCart(cid, pid, quantity)
        res.json(updatedCart.products)
    } catch (error) {
        console.log(`Error al agregar producto al carrito`, error)
        res.status(500).send(`Error al agregar el carrito`)
    }
})

// Route to delete a cart by its ID (cid)
router.delete('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    try {
        await cartManager.deleteCart(cid)
        res.status(200).send(`ID del carrito ${cid} eliminado`)
    } catch (error) {
        console.log(`Error al eliminar el ID del carrito ${cid}`, error)
        res.status(500).send(`Error al eliminar el ID del carrito ${cid}`)
    }
})

export default router