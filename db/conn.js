const Sequelize = require('sequelize')
const sequelize = new Sequelize('bd_dados','root','senai',{
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('Conexão estabelecida com sucesso..')
// }).catch((error)=>{
//     console.error('Não foi possível realizar conexão com o Bando de Dados..')
// })

module.exports = sequelize
