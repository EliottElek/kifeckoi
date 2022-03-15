import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Project } from "./Project";
@Entity()
export class Client extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @OneToMany(() => Project, project => project.client) projects!: Project[];
}