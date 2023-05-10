const DataTypes = require('sequelize')
const db = require('../db/conn.js')

const Usuario = db.define('usuarios',{
    nome: {
        type: DataTypes.STRING(30)
    },
    numero_inteiro_favorito: {
        type: DataTypes.INTEGER(6)
    },
},{
    createdAt: false,
    updatedAt: false
})

// Usuario.sync({force:true})

module.exports = Usuario
