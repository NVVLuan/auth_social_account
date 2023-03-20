import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne } from 'typeorm';
import { UserAccount } from '../user/userAccount.entity';

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

    @ManyToOne(() => UserAccount)
    @JoinTable()
    userAccount: UserAccount;
}
