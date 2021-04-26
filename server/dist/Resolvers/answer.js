"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnswers = exports.createAnswer = void 0;
const Answer_1 = require("../Entities/Answer");
const Question_1 = require("../Entities/Question");
const User_1 = require("../Entities/User");
const nanoid_1 = require("nanoid");
const createAnswer = (res, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne(userId);
    if (!user)
        return res.send({ Error: "User doesn't exist" }).status(404).end();
    const question = yield Question_1.Question.findOne(data.questionId);
    if (!question)
        return res.send({ Error: "Question doesn't exist" }).status(404).end();
    const answer = Answer_1.Answer.create({
        id: nanoid_1.nanoid(),
        username: user.username,
        answer: data.answer,
        postId: question.id,
        question: question,
    });
    yield answer.save().catch((err) => {
        return res.send({ Error: err }).status(501).end();
    });
    return res.send(answer).status(200).end();
});
exports.createAnswer = createAnswer;
const getAnswers = (res, questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const answers = yield Answer_1.Answer.find({
        where: {
            postId: questionId,
        },
        take: 10,
        order: {
            createdAt: "DESC",
        },
    });
    if (!answers)
        return res.send({ Error: "No answers for this question yet" }).end();
    return res.send(answers).end();
});
exports.getAnswers = getAnswers;
//# sourceMappingURL=answer.js.map