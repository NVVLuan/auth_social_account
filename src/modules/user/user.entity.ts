import { Entity, PrimaryGeneratedColumn, Column, VersionColumn } from 'typeorm';

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

    @Column({ default: false })
    active: boolean;

    @Column()
    email: string;

    @VersionColumn()
    version: Date;
}
