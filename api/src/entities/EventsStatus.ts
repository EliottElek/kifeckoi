import { BaseEntity, PrimaryColumn, Column, Entity, OneToOne, ManyToOne } from "typeorm";
import { EventsSchema } from "./EventsSchema";

@Entity()
export class EventsStatus extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column()
    title!: string;
    @Column()
    index!: number;
    @ManyToOne(() => EventsSchema, eventsSchema => eventsSchema.eventsStatus, { onDelete: 'CASCADE' }) eventsSchema!: EventsSchema;
}