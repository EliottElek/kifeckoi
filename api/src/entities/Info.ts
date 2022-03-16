import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./Project";
@Entity()
export class Info extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @Column()
    accountable!: string;
    @Column()
    description!: string;
    @Column()
    status!: string;
    @ManyToOne(() => Project, project => project.actions, { onDelete: 'CASCADE' }) project!: Project;
}