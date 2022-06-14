import { BaseEntity, PrimaryColumn, Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Notification extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    seen!: boolean;
    @Column("longtext")
    content!: string;
    @Column()
    redirect!: string;
    @Column()
    creation!: string;
    @Column()
    message!: string;
    @ManyToOne(() => Project, project => project.notifications) project!: Project;
    @ManyToOne(() => User, emitter => emitter.notificationsEmitted) emitter!: User;
    @ManyToMany(() => User, receiver => receiver.notifications, { onDelete: 'CASCADE' })
    @JoinTable()
    receivers!: User[];
}
