//importation du module mysql
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require("../config/db.config");
const bcrypt = require("bcryptjs");
const studentModel = require("./students.model");
const userModel = require("./users.model");
const lessonModel = require("./lessons.model");


const listeEtudiants = require("../config/test/liste.etudiants");
const listeUsers = require("../config/test/liste.users");

const sequelize = new Sequelize( // ici on créé une new instance de Sequelize
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  { 
  host: dbConfig.HOST, 
  dialect: 'mysql',
  logging: false //pour ne pas voir s'afficher le retour bdd dans les log du terminal 
  }
);

const Student = studentModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);
const Lesson = lessonModel(sequelize, DataTypes);


//créer la relation One-to-one entre User(cible) et Student(source)
// la clef étrangère est égale à la clef primaire de student
// avec belongsTo, si on supprime la cible on supprime la source avec
Student.hasOne(User); //insère la clef étrangère dans la cible donc table users va contenir clef étrangère nommée studentId
User.belongsTo(Student); //insère la clef étrangère dans la source -> studentId





const initDb = () => {
  return sequelize.sync({force : true})
  .then (_ => { // le then s'exécute si le sync s'est bien éxécuté
  listeEtudiants.map(student => { //map va lire le tableau et chq ligne sera identifiée par students
    Student.create(student);
  })  
  listeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 5); //hash le mdp en param
    User.create(user)
  })
  console.log(" oOoOoOooO-----> connection à la BDD réussie ! <-----oOoOoOooO");
  })
  .catch(error => {
    console.log("Erreur lors de la connection BDD \n" + error)
  })
}



//db.students.belongsToMany(db.lessons, { through: 'LessonStudents' });
//db.lessons.belongsToMany(db.students, { through: 'LessonStudents' });

module.exports = {
  initDb, Student, User, Lesson
};