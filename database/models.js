const DataTypes = require("sequelize");
const dbConnection = require("./db_connection");

module.exports.User = dbConnection.sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
    }
})

module.exports.Message = dbConnection.sequelize.define('messages', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
})