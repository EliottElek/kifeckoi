import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Client } from "./Client";
@Entity()
export class Project extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @ManyToOne(() => Client, client => client.projects, { onDelete: 'CASCADE' }) client!: Client;
}