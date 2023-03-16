import { UserDetail } from './userDetail.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Social } from '../auth_social/social.entity';

interface UserInterface {
    id: string;

    userNameAccount: string;
}

@Entity()
export class UserAccount implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userNameAccount: string;

    @OneToOne(() => UserDetail)
    @JoinColumn()
    userDetail: UserDetail;

    @ManyToMany(() => Social)
    @JoinTable()
    socials: Social[];
}
