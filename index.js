const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn.js')
const Verdura = require('./models/Verdura.js')

const PORT = 3000
const hostname = 'localhost'

/* -------------config express------------ */

app.use(express.json())
app.use(express.static('public'))

/* -------------config handlebars------------ */

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())

/* --------------------------------------- */


app.post('/pesquisar', async(res,req)=>{
    const codigo = req.body.codigo
    console.log(codigo)
    const pesq = await Verdura.findOne({raw:true,where:{id:codigo}})
    console.log(pesq)
    res.redirect('/')
})
app.get('/pesquisar',(req,res)=>{
    res.render('pequisa')
})

app.get('/listar', async (req,res)=>{
    const dados = await Verdura.findAll({raw:true}) 
    res.render('lista',{valores:dados})
})


app.get('/',(req,res)=>{
    res.render('home')
})

/* ---------conexão banco de dados-------- */

conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.log(`Erro de conexão com o Bando de Dados: ${error}`)
})
