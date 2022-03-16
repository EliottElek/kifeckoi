import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Action } from "./Action";
import { Client } from "./Client";
@Entity()
export class Project extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @ManyToOne(() => Client, client => client.projects, { onDelete: 'CASCADE' }) client!: Client;
    @OneToMany(() => Action, action => action.project) actions!: Action[];
}