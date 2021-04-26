import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { User } from "./User";

@Entity()
export class Question extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    question: string;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];

    @ManyToOne(() => User, (user) => user.questions)
    author: User;

    @CreateDateColumn()
    createdAt: Date;
}
