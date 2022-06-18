import { BaseEntity, PrimaryColumn, Column, Entity, OneToMany, ManyToMany } from "typeorm";
import { Event } from "./Event";
import { Comment } from './Comment';
import { Project } from './Project';
import { Notification } from "./Notification";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    id!: string;
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
    @ManyToMany(() => Event, (events: { contributors: any; }) => events.contributors, { cascade: true }) events!: Event[];
    @ManyToMany(() => Notification, (notifications: { receivers: any; }) => notifications.receivers, { cascade: true }) notifications!: Notification[];
    @ManyToMany(() => Project, (projects: { contributors: any; }) => projects.contributors, { cascade: true }) projects!: Project[];
    @OneToMany(() => Comment, comment => comment.author) comments!: Comment[];
    @OneToMany(() => Event, event => event.creator) createdEvents!: Event[];
    @OneToMany(() => Notification, notification => notification.emitter) notificationsEmitted!: Notification[];
}