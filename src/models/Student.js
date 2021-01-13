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
                nome:DataTypes.STRING,
                email:DataTypes.STRING,
                senha:DataTypes.STRING
            },

            {
                
                sequelize,
                tableName: "alunos"
            }
        )
    }
    // AQUI CONFIGURAMOS OS RELACIONAMENTOS
    static associate(models){
        this.hasMany(models.Question, {foreignKey: "aluno_id"});
    }
}

module.exports = Student;