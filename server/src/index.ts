import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from "cors";
import express, { Request, Response } from "express";
import { User } from "./Entities/User";
import { checkIfLoggedIn, createUser, loginUser } from "./Resolvers/user";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { VerifyToken } from "./Util/Verifytoken";
import {
    createQuestion,
    getQuestion,
    getQuestions,
    getUserQuestions,
} from "./Resolvers/question";
import { createAnswer, getAnswers } from "./Resolvers/answer";
import { Answer } from "./Entities/Answer";
import { Question } from "./Entities/Question";
import https from "https";
import fs from "fs";

dotenv.config();

const main = async () => {
    const connection = createConnection({
        type: "postgres",
        host: <string>process.env.DB_HOST,
        port: <number | undefined>process.env.DB_PORT,
        username: <string>process.env.DB_USERNAME,
        password: <string>process.env.DB_PASSWORD,
        database: <string>process.env.DB_NAME,
        synchronize: true,
        logging: true,
        entities: [User, Question, Answer],
    });
    (await connection).runMigrations();

    const app = express();
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(cookieParser());

    app.post("/register", async (req: Request, res: Response) => {
        await createUser(req.body, res);
    });
    app.post("/login", async (req: Request, res: Response) => {
        res.cookie("pede", "oled");
        await loginUser(req.body, res);
    });
    app.post(
        "/question",
        [VerifyToken],
        async (req: Request, res: Response) => {
            await createQuestion(res, res.locals.token, req.body);
        }
    );
    app.post("/answer", [VerifyToken], async (req: Request, res: Response) => {
        await createAnswer(res, res.locals.token, req.body);
    });
    app.get("/questions", async (_: Request, res: Response) => {
        await getQuestions(res);
    });
    app.get("/answers/:id", async (req: Request, res: Response) => {
        await getAnswers(res, req.params.id);
    });
    app.get("/question/:id", async (req: Request, res: Response) => {
        await getQuestion(res, req.params.id);
    });
    app.get("/auth", [VerifyToken], async (_: Request, res: Response) => {
        await checkIfLoggedIn(res, res.locals.token);
    });
    app.get("/:username", async (req: Request, res: Response) => {
        await getUserQuestions(res, req.params.username);
    });
    https
        .createServer(
            {
                key: fs.readFileSync("./cert/localhost-key.pem"),
                cert: fs.readFileSync("./cert/localhost.pem"),
            },
            app
        )
        .listen(5000);
};

main();
