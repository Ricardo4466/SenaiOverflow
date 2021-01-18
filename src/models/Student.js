const {Model, DataTypes} = require("sequelize");

class Student extends Model
{
    // AQUI INICIALIZAMOS NOSSOS CAMPOS DA TABELA
    static init(sequelize)
    {
        super.init
        (
            {
                ra: DataTypes.STRING,
                name:DataTypes.STRING,
                email:DataTypes.STRING,
                password:DataTypes.STRING
            },

            {
                sequelize,
            }
        )
    }
    // AQUI CONFIGURAMOS OS RELACIONAMENTOS
    static associate(models)
    {
        this.hasMany(models.Question);
        this.hasMany(models.Answer);
    }
}

module.exports = Student;