const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        description : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        price : {
            type : Sequelize.FLOAT,
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        fkGroup : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        fkSubgroup : {
            type : Sequelize.INTEGER,
            allowNull : false,
        }, 
        fkCollection : {
            type : Sequelize.INTEGER,
            allowNull : false,
        }
    })
}