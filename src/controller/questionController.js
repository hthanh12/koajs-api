const { Question, Answer } = require("../model");
const response = require("../utils/response");
const answerService = require("../service/answer");

exports.checkResult = async (ctx) => {
  try {
    let user = ctx.state.user;
    console.log(user.id);
    let list_answers = [];
    let data = {
      username: user.username,
      correct_answer : 0,
      wrong_answer : 0
    }
    
    let { answers, ids_question } = ctx.request.body;

    for (let i = 0; i < ids_question.length; i++) {
      let question = await Question.findByPk(ids_question[i]);
      if (question) {
        let checkResult = question.dataValues.correct_answers == answers[i];
        if (checkResult) data.correct_answer++;
        else data.wrong_answer++;

        list_answers.push({"answer":answers[i], "id_question" :ids_question[i]})
      }
    }
    
    console.log(list_answers)
    let saveAnswer = await answerService.saveAnswer(user.id,list_answers)
    if(!saveAnswer) 
      return response.error(ctx,{error:'Save answer error'})

    return response.created(ctx, { data });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.getList = async (ctx) => {
  try {
    let question = await Question.findAll();
    return response.success(ctx, { data: { question } });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.getItem = async (ctx) => {
  try {
    const questionId = ctx.params.questionId;
    let question = await Question.findByPk(questionId);

    if (!question)
      return response.notFound(ctx, { error: "Not found question" });

    return response.success(ctx, { data: { question } });
  } catch (error) {
    return response.error(ctx, { error });
  }
};
