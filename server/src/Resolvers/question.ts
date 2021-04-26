import { Response } from "express";
import { Question } from "../Entities/Question";
import { User } from "../Entities/User";
import { nanoid } from "nanoid";

export const createQuestion = async (
    res: Response,
    userId: string,
    data: any
) => {
    const user = await User.findOne(userId);
    if (!user) return res.send({ Error: "no user found" }).status(404).end();
    const id = nanoid();
    const question = Question.create({
        username: user.username,
        id: id,
        question: data.question,
        author: user,
    });
    await question.save().catch((err) => {
        if (err) return res.send({ Error: err }).status(501).end();
    });
    return res.send(question).status(200).end();
};

export const getQuestions = async (res: Response) => {
    const questions = await Question.find({
        take: 10,
        order: {
            createdAt: "DESC",
        },
    });

    if (!questions) return res.send({ Error: "No questions asked yet" }).end();
    return res.send(questions).end();
};

export const getQuestion = async (res: Response, id: string) => {
    const question = await Question.findOne(id);
    if (!question)
        return res.send({ Error: "Question doesn't exist" }).status(404).end();

    return res.send(question).status(200).end();
};

export const getUserQuestions = async (res: Response, username: string) => {
    const user = await User.findOne({
        where: {
            username: username,
        },
        relations: ["questions"],
    });

    if (!user) return res.send({ Error: "user not found" }).end();
    console.log(user);

    return res.send(user.questions).end();
};
