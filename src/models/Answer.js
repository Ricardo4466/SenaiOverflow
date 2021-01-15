const {Model, DataTypes} = require("sequelize");

class Answer extends Model
{
    // Iniciando os campos da tabela
    static init(sequelize)
    {
        super.init
        (
            {
                answer: DataTypes.TEXT,
                student_id: DataTypes.INTEGER
            },
            {
                sequelize,
            }
        )
    }
    // Configuração de relacionamento
    static associate(models)
    {
        this.belongsTo(models.Question);
        this.belongsTo(models.Student, {foreignKey:"student_id"})
    }
}

module.exports = Answer;