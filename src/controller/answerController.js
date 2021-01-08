const { Answer } = require("../model");
const response = require("../utils/response");

exports.checkResult = async (ctx) => {
  try {
    let score = 0;
    let { answers, ids_question } = ctx.request.body;
    console.log({ answers, ids_question });

    for (let i = 0; i < ids_question.length; i++) {
      let checkAnswer = await Answer.findOne({
        where: { id_question: ids_question[i], value: answers[i] },
      });

      if(checkAnswer.result) score++;
    }

    return response.success(ctx, { data: {score} });
  } catch (error) {
    return response.error(ctx, { error });
  }
};
