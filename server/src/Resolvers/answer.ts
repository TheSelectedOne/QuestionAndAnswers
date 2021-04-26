import { Response } from "express";
import { Answer } from "../Entities/Answer";
import { Question } from "../Entities/Question";
import { User } from "../Entities/User";
import { nanoid } from "nanoid";

export const createAnswer = async (
    res: Response,
    userId: string,
    data: any
) => {
    const user = await User.findOne(userId);
    if (!user)
        return res.send({ Error: "User doesn't exist" }).status(404).end();

    const question = await Question.findOne(data.questionId);
    if (!question)
        return res.send({ Error: "Question doesn't exist" }).status(404).end();

    const answer = Answer.create({
        id: nanoid(),
        username: user.username,
        answer: data.answer,
        postId: question.id,
        question: question,
    });

    await answer.save().catch((err) => {
        return res.send({ Error: err }).status(501).end();
    });

    return res.send(answer).status(200).end();
};

export const getAnswers = async (res: Response, questionId: string) => {
    const answers = await Answer.find({
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
};
