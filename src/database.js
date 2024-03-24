import mongoose from 'mongoose'
mongoose.connect(`mongodb+srv://leandrosantillan4:coderhouse@cluster0.0rh4mcv.mongodb.net/ecommerce?retryWrites=true&w=majority`)
.then(()=> console.log("Conexión exitosa a MongoDB Atlas"))
.catch(() => console.log("Error de conexión a MongoDB Atlas"))