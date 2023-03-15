import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface UserInterface {
    id: string;

    userName: string;

    password: string;

    email: string;
}

@Entity()
export class User implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    email: string;
}
