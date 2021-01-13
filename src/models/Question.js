const {Model, DataTypes} = require("sequelize");

class Question extends Model
{
    // AQUI INICIALIZAMOS NOSSOS CAMPOS DA TABELA
    static init(sequelize)
    {
        super.init
        (
            {
                titulo: DataTypes.STRING,
                descricao:DataTypes.STRING,
                imagem:DataTypes.STRING,
                gist:DataTypes.STRING
            },

            {
                
                sequelize,
                tableName: "perguntas"
            }
        )
    }
    // AQUI CONFIGURAMOS OS RELACIONAMENTOS
    static associate(models)
    {
        this.belongsTo(models.Student, {foreignKey: "aluno_id"});
    }
}

module.exports = Question;