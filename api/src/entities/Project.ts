import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Event } from "./Event";
import { Client } from "./Client";
import { User } from "./User";

@Entity()
export class Project extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @ManyToOne(() => Client, client => client.projects, { onDelete: 'CASCADE' }) client!: Client;
    @OneToMany(() => Event, event => event.project) events!: Event[];
    @ManyToMany(() => User, contributor => contributor.projects)
    @JoinTable()
    contributors!: User[];
}