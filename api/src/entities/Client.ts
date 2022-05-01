import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";
@Entity()
export class Client extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @OneToMany(() => Project, project => project.client) projects!: Project[];
    @ManyToMany(() => User, contributor => contributor.projects, { onDelete: 'CASCADE' })
    @JoinTable()
    contributors!: User[];
}