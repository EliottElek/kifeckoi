import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Event } from "./Event";
import { Client } from "./Client";
import { User } from "./User";
import { Notification } from "./Notification";
import { EventsSchema } from "./EventsSchema";
@Entity()
export class Project extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @Column()
    globalStatus!: string;
    @Column()
    planningStatus!: string;
    @Column()
    perimeterStatus!: string;
    @Column("longtext")
    globalDescription!: string;
    @Column("longtext")
    planningDescription!: string;
    @Column("longtext")
    perimeterDescription!: string;
    @Column()
    goLiveDate!: string;
    @Column()
    goCopyDate!: string;
    @Column()
    logoUrl!: string;
    @Column()
    clientId!: string;
    @Column()
    creation!: string;
    @ManyToOne(() => User, creator => creator.projects, { onDelete: 'CASCADE' }) creator!: User;
    @ManyToOne(() => Client, client => client.projects, { onDelete: 'CASCADE' }) client!: Client;
    @OneToMany(() => Event, event => event.project, { onDelete: 'CASCADE' }) events!: Event[];
    @ManyToMany(() => User, contributor => contributor.projects, { onDelete: 'CASCADE' })
    @JoinTable()
    contributors!: User[];
    @OneToMany(() => Notification, notification => notification.project) notifications!: Notification[];
    @OneToMany(() => EventsSchema, (eventsSchema) => eventsSchema.project, { onDelete: 'CASCADE' }) eventsSchema!: EventsSchema[];

}