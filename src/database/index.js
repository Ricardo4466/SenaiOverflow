const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//  IMPORT DOS MODELS
const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");


const connection = new Sequelize(dbConfig);

// INICIALIZA OS MODELS
Student.init(connection);
Question.init(connection);
Category.init(connection);
Answer.init(connection);

// INICIALIZA OS RELACIONAMENTOS
Student.associate(connection.models);
Question.associate(connection.models);
Category.associate(connection.models);
Answer.associate(connection.models);

// for (let assoc of Object.keys(Question.associations)) {
//     for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
//         console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
//     }
// }