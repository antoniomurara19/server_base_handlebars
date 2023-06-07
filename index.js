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
app.get('/apagar',(req,res)=>{
    res.render('apaga')
})
app.post('/apagar', async(req,res)=>{
    const id = req.body.id
    console.log(id)
    const pesq = await Verdura.findOne({raw:true,where:{id:id}})
    console.log(pesq)
    Verdura.destroy({where: {id:pesq.id}})
    res.redirect('/listar')
})
app.get('/pesquisar',(req,res)=>{
    res.render('pesquisa')
})
app.post('/pesquisar', async(req,res)=>{
    const codigo = req.body.codigo
    console.log(codigo)
    const pesq = await Verdura.findOne({raw:true,where:{id:codigo}})
    console.log(pesq)
    res.render('pesquisa',{valor:pesq})
})
app.get('/cadastrar',(req,res)=>{
    res.render('cadastro')
})
app.post('/cadastrar', async(req,res)=>{
    const verduras = req.body.verduras
    const qntd = req.body.qntd
    const preco_unit = req.body.preco_unit
    console.log(verduras,qntd,preco_unit)
    await Verdura.create({verduras,qntd,preco_unit})
    res.redirect('/listar')
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
