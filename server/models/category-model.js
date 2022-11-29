const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Category', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        name : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}