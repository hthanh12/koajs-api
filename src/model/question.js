module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define(
      'Question',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true
        },
        content: {
          type: DataTypes.STRING,
        },
        value: {
          type: DataTypes.STRING,
        },
        id_exam: {
          type: DataTypes.INTEGER,
        },
      },
      {
        timestamps: false,
        tableName: 'question',
      }
      
    );
    Question.associate = function (models) {
      // associations can be defined here
    };
    return Question;
  };