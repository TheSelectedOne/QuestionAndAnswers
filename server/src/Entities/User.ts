import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn({ unique: true })
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Question, (question) => question.author)
    questions: Question[];

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    verified: boolean;
}
