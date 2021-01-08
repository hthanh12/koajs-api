module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define(
      'Answer',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true
        },
        id_user: {
          type: DataTypes.INTEGER,
        },
          list_answers: {
            type: DataTypes.JSONB,
          },
      },
      {
        timestamps: false,
        tableName: 'answers',
      }
    );
    Answer.associate = function (models) {
      // associations can be defined here
    };
    return Answer;
  };