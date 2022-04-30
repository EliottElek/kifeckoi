import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryColumn()
    id!: string;
    @Column("longtext")
    content!: string;
    @Column()
    eventId!: string;
    @Column()
    creation!: string;
    @ManyToOne(() => Event, event => event.comments, { onDelete: 'CASCADE' }) event!: Event;
    @ManyToOne(() => User, author => author.comments, { onDelete: 'CASCADE' }) author!: User;
}
