const {Model, DataTypes} = require("sequelize");

class Category extends Model
{
    // AQUI INICIALIZAMOS NOSSOS CAMPOS DA TABELA
    static init(sequelize)
    {
        super.init
        (
            {
                description: DataTypes.STRING,
               
            },

            {
                
                sequelize,
            }
        )
    }
    // AQUI CONFIGURAMOS OS RELACIONAMENTOS
    static associate(models){
        this.belongsToMany(models.Question, {through: "question_categories"})
    }
}

module.exports = Category;