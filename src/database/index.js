const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//  IMPORT DOS MODELS
const Student = require("../models/Student");
const Question = require("../models/Question");

const conexao = new Sequelize(dbConfig);

// INICIALIZA OS MODELS
Student.init(conexao);
Question.init(conexao);

// INICIALIZA OS RELACIONAMENTOS
Student.associate(conexao.models);
Question.associate(conexao.models);
