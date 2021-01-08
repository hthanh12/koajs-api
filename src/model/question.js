module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define(
      'Question',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true
        },
        answers_list: {
          type: DataTypes.JSONB,
        },
        value: {
          type: DataTypes.STRING,
        },
        id_exam: {
          type: DataTypes.INTEGER,
        },
        content: {
          type: DataTypes.STRING,
        },
        meta: {
          type: DataTypes.JSONB,
        },
        correct_answers: {
          type: DataTypes.JSONB,
        },
      },
      {
        timestamps: false,
        tableName: 'questions',
      }
      
    );
    Question.associate = function (models) {
      // associations can be defined here
    };
    return Question;
  };