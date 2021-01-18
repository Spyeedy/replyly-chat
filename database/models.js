const DataTypes = require("sequelize");
const dbConnection = require("./db_connection");

const uuidPK = {
	type: DataTypes.UUIDV4,
	allowNull: false,
	unique: true,
	primaryKey: true
};

module.exports.User = dbConnection.sequelize.define('users', {
	id: uuidPK,
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
    }
})

module.exports.Message = dbConnection.sequelize.define('messages', {
	id: uuidPK,
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports.Room = dbConnection.sequelize.define('rooms', {
	id: uuidPK,
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})