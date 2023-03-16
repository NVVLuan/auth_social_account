import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface SocialInterface {
    id: string;

    socialName: string;
}

@Entity()
export class Social implements SocialInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    socialName: string;
}
