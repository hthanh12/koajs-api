module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define(
      'Answer',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true
        },
        id_question:{
          type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING,
        },
        value: {
          type: DataTypes.STRING,
        },
        result: {
          type: DataTypes.INTEGER,
        },
      },
      {
        timestamps: false,
        tableName: 'answer',
      }
      
    );
    Answer.associate = function (models) {
      // associations can be defined here
    };
    return Answer;
  };