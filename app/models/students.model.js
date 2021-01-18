module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      birthdate: {
        type:Sequelize.DATE
      },
      age: {
        type:Sequelize.INTEGER
      },
      level: {
        type:Sequelize.INTEGER
      },
      profile_picture: {
        type:Sequelize.TEXT
      }
  });
  return Student;
};