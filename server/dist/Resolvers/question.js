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
exports.getUserQuestions = exports.getQuestion = exports.getQuestions = exports.createQuestion = void 0;
const Question_1 = require("../Entities/Question");
const User_1 = require("../Entities/User");
const nanoid_1 = require("nanoid");
const createQuestion = (res, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne(userId);
    if (!user)
        return res.send({ Error: "no user found" }).status(404).end();
    const id = nanoid_1.nanoid();
    const question = Question_1.Question.create({
        username: user.username,
        id: id,
        question: data.question,
        author: user,
    });
    yield question.save().catch((err) => {
        if (err)
            return res.send({ Error: err }).status(501).end();
    });
    return res.send(question).status(200).end();
});
exports.createQuestion = createQuestion;
const getQuestions = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield Question_1.Question.find({
        take: 10,
        order: {
            createdAt: "DESC",
        },
    });
    if (!questions)
        return res.send({ Error: "No questions asked yet" }).end();
    return res.send(questions).end();
});
exports.getQuestions = getQuestions;
const getQuestion = (res, id) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield Question_1.Question.findOne(id);
    if (!question)
        return res.send({ Error: "Question doesn't exist" }).status(404).end();
    return res.send(question).status(200).end();
});
exports.getQuestion = getQuestion;
const getUserQuestions = (res, username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: {
            username: username,
        },
        relations: ["questions"],
    });
    if (!user)
        return res.send({ Error: "user not found" }).end();
    console.log(user);
    return res.send(user.questions).end();
});
exports.getUserQuestions = getUserQuestions;
//# sourceMappingURL=question.js.map