import express from 'express'
import multer from 'multer'
import __dirname from './utils.js'
import exphbs from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import ProductManager from './controllers/productsManagerDb.js'
const productManager = new ProductManager
import "./database.js"


const PORT = 8080
const app = express()

const router = express.Router()

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'


// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(`./src/public`))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
app.use(multer({ storage }).single("image"))


// Configuracion de handlebars
app.engine('handlebars', exphbs.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set(`view engine`, `handlebars`)
app.set(`views`, `./src/views`)


// Rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use(`/`, viewsRouter)


// Listen:
const httpServer = app.listen(PORT, () => {
    console.log('Escuchando en el Puerto ' + PORT)
    console.log(`Lista de Productos: http://localhost:8080/`);
    console.log(`Productos RealTime: http://localhost:8080/realTimeProducts`);
  
})

// Config Socket.io
const io = new Server(httpServer)





io.on("connection", async (socket) => {
    console.log("Cliente conectado")

   
    socket.emit("products", await productManager.getProducts())

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id)

        io.sockets.emit("products", await productManager.getProducts())
    })

    socket.on("addProduct", async ({ title, description, price, img, code, stock, category }) => {
        await productManager.addProduct({ title, description, price, img, code, stock, category })
        io.sockets.emit("products", await productManager.getProducts())
    })

})