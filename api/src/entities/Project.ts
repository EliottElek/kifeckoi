import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Event } from "./Event";
import { Client } from "./Client";
@Entity()
export class Project extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @ManyToOne(() => Client, client => client.projects, { onDelete: 'CASCADE' }) client!: Client;
    @OneToMany(() => Event, event => event.project) events!: Event[];
}