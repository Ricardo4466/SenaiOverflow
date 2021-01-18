'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // AQUI DIZEMOS O QUE DEVE SER FEITO
   queryInterface.createTable("students",{
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
    name:{
      type:Sequelize.STRING,
      allowNull: false,
      
    },
    email:{
      type:Sequelize.STRING,
      allowNull: false,
    },
    password:{
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
    queryInterface.dropTable("students");
  }
};
