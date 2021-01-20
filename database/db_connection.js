const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(__dirname, "./database.sqlite")
});
module.exports.sequelize = sequelize;


const { User, Message, Room } = require("./models");

module.exports.setupDB = (drop) => {
    sequelize.authenticate()
    .then(() => console.log("DB connected"))
    .then(() => {
        Message.belongsTo(User);
        Message.belongsTo(Room);
        Room.belongsToMany(User, { through: "roomusers" })
        
        sequelize.sync({ force: drop })
    })
    .catch(err => console.log(err));
};