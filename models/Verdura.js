const { DataTypes } = require('sequelize')
const db = require('../db/conn.js')

const Verdura = db.define('verdura',{
    verduras : {
        type : DataTypes.STRING(20)
    },
    qntd : {
        type : DataTypes.INTEGER
    },
    preco_unit : {
        type : DataTypes.FLOAT
    }
},{
    createdAt: false,
    updatedAt: false
})

// Verdura.sync({force:true})

module.exports = Verdura
