const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn.js')
const Usuario = require('./models/Usuario.js')

const PORT = 3000
const hostname = 'localhost'

/* -------------config express------------ */
app.use(express.urlencoded({force:true}))
app.use(express.json())
app.use(express.static('public'))

/* -------------config handlebars------------ */
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

/* --------------------------------------- */

app.get('/listar', async (req,res)=>{
    const dados = await Usuario.findAll({raw:true})
    console.log(dados)
    res.render('lista',{valor: dados})
})
app.get('/',(req,res)=>{
    res.render('home')
})



/* --------------------------------------- */
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.log(`Erro de conexão com o Bando de Dados: ${error}`)
})
