const { Answer } = require("../model");
const response = require("../utils/response");
const answerService = require("../service/answer");
const { QueryTypes,sequelize, literal,Op } = require('sequelize');

exports.sameResult = async (ctx) => {
  try {
    let {questionId, answerList} = ctx.params;
    console.log(answerList)
    const answer = await Answer.findAll({where: {
      list_answers:{
        [Op.contains]:[{"answer": 1, "id_question": 1}]
      }
    }})
    console.log(answer)
    return response.success(ctx, { data: { questionId, answerList } });
  } catch (error) {
    console.log(error)
    return response.error(ctx, { error });
  }
};
