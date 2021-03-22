const { Question, Answer } = require("../models");
const response = require("../utils/response");
const answerService = require("../service/answer");

exports.checkResult = async (ctx) => {
  try {
    let user = ctx.state.user;
    let list_answers = [];
    let data = {
      username: user.username,
      correct_answer: 0,
      wrong_answer: 0,
    };

    let { answers, ids_question } = ctx.request.body;

    for (let i = 0; i < ids_question.length; i++) {
      let question = await Question.findByPk(ids_question[i]);
      if (question) {
        let checkResult = question.dataValues.correct_answers == answers[i];
        if (checkResult) data.correct_answer++;
        else data.wrong_answer++;

        list_answers.push({ answer: answers[i], id_question: ids_question[i] });
      }
    }

    let saveAnswer = await answerService.saveAnswer(user.id, list_answers);
    if (!saveAnswer) return response.error(ctx, { error: "Save answer error" });

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
    const {questionId } = ctx.params;
    let question = await Question.findByPk(questionId);

    if (!question)
      return response.notFound(ctx, { error: "Not found question" });

    return response.success(ctx, { data: { question } });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.createItem = async (ctx) => {
  try {
    const user = ctx.state.user;
    const {
      content,
      correct_answers,
      id_exam,
      answers_list,
    } = ctx.request.body;

    let QuestionCreate = await Question.create({
      content,
      correct_answers,
      id_exam,
      answers_list,
      status: 1,
      createdBy: user.id,
      updatedBy: user.id,
    });

    if (!QuestionCreate)
      return response.error(ctx, { error: "Can not create question" });

    return response.success(ctx, { data: { QuestionCreate } });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.updateItem = async (ctx) => {
  try {
    const user = ctx.state.user;
    const { questionId } = ctx.params;
    const {
      content,
      correct_answers,
      id_exam,
      answers_list,
      status,
    } = ctx.request.body;

    let question = await Question.findByPk(questionId);

    if (!question)
      return response.notFound(ctx, { error: "Not found question" });

    let dataUpdate = {
      content: content || question.content,
      correct_answers: correct_answers || question.correct_answers,
      id_exam: id_exam || question.id_exam,
      answers_list: answers_list || question.answers_lis,
      status: status || question.status,
      updatedBy: user.id,
    };
    let questionUpdate = await Question.update(dataUpdate, {
      where: { id: questionId },
    });

    if (!questionUpdate)
      return response.error(ctx, { error: "Can not update question" });

    return response.success(ctx, { data: { dataUpdate } });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.deleteItem = async (ctx) => {
  try {
    let user = ctx.state.user;
    let { questionId } = ctx.params;
    let question = await Question.findByPk(questionId);

    if (!question)
      return response.notFound(ctx, { error: "Not found question" });

    const questionDelete = await Question.update(
      { status: 1, updatedBy: user.id },
      { where: { id: questionId } }
    );

    if (!questionDelete)
      return response.error(ctx, { error: "Can not delete question" });

    return response.success(ctx, { data: "Delete question success" });
  } catch (error) {
    return response.error(ctx, { error });
  }
};
