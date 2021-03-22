const { Answer } = require("../models");
const response = require("../utils/response");
const answerService = require("../service/answer");
const { QueryTypes,sequelize, literal,Op } = require('sequelize');

exports.sameResult = async (ctx) => {
  try {
    let count = 0;
    let {questionId, answerList} = ctx.params;
    questionId = parseInt(questionId)
    answerList = parseInt(answerList)
    const answer = await Answer.findAndCountAll({where: {
      list_answers:{
        [Op.contains]:[{"answer": answerList, "id_question": questionId}]
      }
    }})

    if(!answer) return response.error(ctx, {error:"Can not get same answer"})
    count = answer.count--;
    return response.success(ctx, { data: { count, questionId, answerList } });
  } catch (error) {
    console.log(error)
    return response.error(ctx, { error });
  }
};
