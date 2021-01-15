'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
  {
    queryInterface.createTable("answers",
    {
      id:
      {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question_id:
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:
        {
          model:"perguntas",
          key:"id"
        }
      },
      student_id:
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:
        {
          model:"alunos",
          key:"id"
        }
      },
      answer:
      {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at:
      {
        type: Sequelize.DATE,
        allowNull:false,
      },
      updated_at:
      {
        type: Sequelize.DATE,
        allowNull:false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => 
  {
    queryInterface.dropTable("answers");
  }
};
