const express = require('express')
const bodyParse = require('body-parser')
const path = require('path');

require('dotenv').config()
const cors = require('cors')

const { dbConnection } = require('./projects/admin/database/config') //require('./database/config')

//console.log(process.env)

// crear servidor express
const app = express()


// Base de datos
dbConnection()

//habilitar cors
app.use(cors())

// lectura desde el body
app.use( express.json() )

//habilitar body parser
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))

// Rutas
app.get('/', (req, res) => {
    res.json({msg:"Inicio EglobalIN-Server..."})
})

app.use('/api/admin/products', require('./projects/admin/routes/product') ) //require('./routes/product') )
app.use('/api/admin/customers', require('./projects/admin/routes/customer') ) //require('./routes/product') )
app.use('/api/admin/orders', require('./projects/admin/routes/order') ) //require('./routes/product') )
app.use('/api/admin/auth', require('./projects/admin/routes/auth') ) //require('./routes/product') )

app.use('/api/admin/categories', require('./projects/admin/routes/category') ) //require('./routes/product') )


// Ruta para servir archivos estáticos
app.use('/uploads', express.static(__dirname + '/uploads'));

//app.use(express.static('uploads'));

//escuchar peticiones
app.listen(process.env.PORT,()=> {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})