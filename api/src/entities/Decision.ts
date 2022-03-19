import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./Project";
@Entity()
export class Decision extends BaseEntity {
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
    @ManyToOne(() => Project, project => project.decisions, { onDelete: 'CASCADE' }) project!: Project;
}