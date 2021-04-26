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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const User_1 = require("./Entities/User");
const user_1 = require("./Resolvers/user");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const Verifytoken_1 = require("./Util/Verifytoken");
const question_1 = require("./Resolvers/question");
const answer_1 = require("./Resolvers/answer");
const Answer_1 = require("./Entities/Answer");
const Question_1 = require("./Entities/Question");
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = typeorm_1.createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: true,
        entities: [User_1.User, Question_1.Question, Answer_1.Answer],
    });
    (yield connection).runMigrations();
    const app = express_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use(cookie_parser_1.default());
    app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.createUser(req.body, res);
    }));
    app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.cookie("pede", "oled");
        yield user_1.loginUser(req.body, res);
    }));
    app.post("/question", [Verifytoken_1.VerifyToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield question_1.createQuestion(res, res.locals.token, req.body);
    }));
    app.post("/answer", [Verifytoken_1.VerifyToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield answer_1.createAnswer(res, res.locals.token, req.body);
    }));
    app.get("/questions", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield question_1.getQuestions(res);
    }));
    app.get("/answers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield answer_1.getAnswers(res, req.params.id);
    }));
    app.get("/question/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield question_1.getQuestion(res, req.params.id);
    }));
    app.get("/auth", [Verifytoken_1.VerifyToken], (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.checkIfLoggedIn(res, res.locals.token);
    }));
    app.get("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield question_1.getUserQuestions(res, req.params.username);
    }));
    https_1.default
        .createServer({
        key: fs_1.default.readFileSync("./cert/localhost-key.pem"),
        cert: fs_1.default.readFileSync("./cert/localhost.pem"),
    }, app)
        .listen(5000);
});
main();
//# sourceMappingURL=index.js.map