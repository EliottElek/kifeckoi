import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";
@Entity()
export class Client extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @Column()
    creation!: string;
    @ManyToOne(() => User, creator => creator.projects, { onDelete: 'CASCADE' }) creator!: User;
    @OneToMany(() => Project, project => project.client) projects!: Project[];
    @ManyToMany(() => User, contributor => contributor.projects, { onDelete: 'CASCADE' })
    @JoinTable()
    contributors!: User[];
}