import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface UserInterface {
    id: string;

    firstName: string;

    lastName: string;

    password: string;

    email: string;
}

@Entity()
export class UserDetail implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({ default: false })
    active: boolean;

    @Column()
    email: string;
}
