const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//  IMPORT DOS MODELS
const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");


const conexao = new Sequelize(dbConfig);

// INICIALIZA OS MODELS
Student.init(conexao);
Question.init(conexao);
Category.init(conexao);
Answer.init(conexao);

// INICIALIZA OS RELACIONAMENTOS
Student.associate(conexao.models);
Question.associate(conexao.models);
Category.associate(conexao.models);
Answer.associate(conexao.models);

// for (let assoc of Object.keys(Question.associations)) {
//     for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
//         console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
//     }
// }