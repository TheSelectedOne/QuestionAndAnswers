import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity()
export class Answer extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    postId: string;

    @Column()
    answer: string;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question;

    @CreateDateColumn()
    createdAt: string;
}
