const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Client', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        cnpj : {
            type : Sequelize.STRING(14),
            allowNull : false,
        },
        socialReason: {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        clienteDesde: {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false,
        }
    })
}