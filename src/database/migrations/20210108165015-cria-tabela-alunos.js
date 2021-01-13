'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // AQUI DIZEMOS O QUE DEVE SER FEITO
   queryInterface.createTable("alunos",{
    id:{
      type:Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    ra:{
      type:Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    nome:{
      type:Sequelize.STRING,
      allowNull: false,
      
    },
    email:{
      type:Sequelize.STRING,
      allowNull: false,
    },
    senha:{
      type:Sequelize.STRING,
      allowNull: false,
    },
    created_at:{
      type: Sequelize.DATE,
      allowNull:false,
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull:false,
    }

   });
  },

  down: async (queryInterface, Sequelize) => {
    // AQUI DIZEMOS O QUE DEVE SER DESFEITO
    queryInterface.dropTable("alunos");
  }
};
