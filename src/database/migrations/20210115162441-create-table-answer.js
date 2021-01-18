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
          model:"questions",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      student_id:
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:
        {
          model:"students",
          key:"id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
