const { Answer } = require("../model");
const response = require("../utils/response");
const answerService = require("../service/answer");
const { QueryTypes,sequelize } = require('sequelize');


exports.sameResult = async (ctx) => {
  try {
    let {questionId, answerList} = ctx.params;
    
    const answer = await sequelize.query('SELECT * FROM "users"',{ type: QueryTypes.SELECT });
    console.log(answer)
    return response.success(ctx, { data: { questionId, answerList } });
  } catch (error) {
    return response.error(ctx, { error });
  }
};
