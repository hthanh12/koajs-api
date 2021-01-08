const { Answer } = require("../model");
const response = require("../utils/response");

exports.saveAnswer = async (userId, listAnswers) => {
  try {
    let saveAnswer = await Answer.create({
      id_user: userId,
      list_answers: listAnswers,
    });
    if (!saveAnswer) return false;
    return true;
  } catch (error) {
    return error;
  }
};
