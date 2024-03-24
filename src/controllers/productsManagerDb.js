import "../models/product.model.js"
import ProductModel from "../models/product.model.js"

class ProductManager {

    async addProduct({ title, description, price, code, stock, category }) {
        try {
            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios")
                return
            }

            const existingProduct = await ProductModel.findOne({ code: code })
            if (existingProduct) {
                console.log("El código de producto ya existe")
                return
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                code,
                stock,
                category,
                status: true,
            })
            await newProduct.save()
        } catch (error) {
            console.log(`Error al agregar producto`, error)
            throw error
        }
    }
    async getProducts() {
        try {
            const products = await ProductModel.find()
            return products
        } catch (error) {
            console.log("Error al recuperar los productos", error)
            throw error
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductModel.findById(id)
            if (!product) {
                console.log("Producto no encontrado")
                return
            }
            console.log(`Producto encontrado: ${product}`)
            return product
        } catch (error) {
            console.log(`Error al obtener el producto por ID`, error)
            throw error
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, updatedProduct)

            if (!updateProduct) {
                console.log("Producto no encontrado")
                return null
            }

            console.log(`Producto actualizado: ${updateProduct}`)
            return updateProduct


        } catch (error) {
            console.log(`Error al actualizar el producto`, error)
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const product = await ProductModel.findByIdAndDelete(id)
            if (!product) {
                console.log("Producto no encontrado")
                return
            }
            console.log(`Producto eliminado: ${product}`)
            return product
        } catch (error) {
            console.log(`Error al eliminar el producto`, error)
            throw error
        }
    }
}

export default ProductManager