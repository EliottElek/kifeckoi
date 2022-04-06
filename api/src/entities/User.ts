import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Event } from "./Event";
import { Comment } from './Comment';
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    firstname!: string;
    @Column()
    lastname!: string;
    @Column()
    email!: string;
    @Column()
    username!: string;
    @Column()
    password!: string;
    @Column()
    avatarUrl!: string;
    @ManyToMany(() => Event, (events: { contributors: any; }) => events.contributors, { cascade: true }) events!: Event[];
    @OneToMany(() => Comment, comment => comment.author) comments!: Comment[];
}