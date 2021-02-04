const DataTypes = require("sequelize");
const { sequelize } = require("./db_connection");

const uuidPK = {
	type: DataTypes.UUIDV4,
	defaultValue: DataTypes.UUIDV4, // need to set default value in order to be auto-generating the PK
	allowNull: false,
	unique: true,
	primaryKey: true
};

const stringAttr = allowNull => {
	return {
        type: DataTypes.STRING,
        allowNull: allowNull
	}
}

module.exports.User = sequelize.define('users', {
	id: uuidPK,
    username: Object.assign(stringAttr(false), { unique: true }),
    avatar: stringAttr(true)
})

module.exports.Message = sequelize.define('messages', {
	id: uuidPK,
    message: stringAttr(false)
})

module.exports.Room = sequelize.define('rooms', {
	id: uuidPK,
	name: stringAttr(false),
	limit: {
		type: DataTypes.INTEGER,
		allowNull: true
	}
})