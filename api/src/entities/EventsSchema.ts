import { BaseEntity, PrimaryColumn, Column, Entity, JoinColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { EventsStatus } from "./EventsStatus";
import { Project } from "./Project";

@Entity()
export class EventsSchema extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    title!: string;
    @Column()
    backgroundUrl!: string;
    @OneToMany(() => EventsStatus, (eventsStatus: { eventsSchema: any; }) => eventsStatus.eventsSchema, { onDelete: 'CASCADE' }) eventsStatus!: EventsStatus[];
    @ManyToOne(() => Project, (project: { eventsSchema: any; }) => project.eventsSchema, { onDelete: 'CASCADE' }) project!: Project;
}