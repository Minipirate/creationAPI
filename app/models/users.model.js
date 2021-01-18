module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
   id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
        msg : "Cet email est déjà utilisé !"
      }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
  },
  {
    timestamps : false
  });
  return User;
};