import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Action extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column()
    status!: string;
    @Column()
    projectId!: string;
    @ManyToOne(() => Project, project => project.actions, { onDelete: 'CASCADE' }) project!: Project;
    @ManyToMany(() => User, accountable => accountable.actions)
    @JoinTable()
    accountables!: User[];

}