import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Action } from "./Action";
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    firstname!: string;
    @Column()
    lastname!: string;
    @Column()
    email!: string;
    @Column()
    username!: string;
    @Column()
    password!: string;
    @Column()
    avatarUrl!: string;
    @ManyToMany(() => Action, (actions: { accountables: any; }) => actions.accountables, { cascade: true }) actions!: Action[];
}