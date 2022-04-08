import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Comment } from "./Comment";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Event extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    type!: string;
    @Column()
    description!: string;
    @Column()
    status!: string;
    @Column()
    projectId!: string;
    @Column()
    creation!: string;
    @ManyToOne(() => Project, project => project.events, { onDelete: 'CASCADE' }) project!: Project;
    @ManyToOne(() => User, user => user.createdEvents, { onDelete: 'CASCADE' }) creator!: User;
    @ManyToMany(() => User, contributor => contributor.events)
    @JoinTable()
    contributors!: User[];
    @OneToMany(() => Comment, comment => comment.event) comments!: Comment[];
}