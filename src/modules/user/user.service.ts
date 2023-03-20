import { UserAccount } from './userAccount.entity';
import { Social } from './../auth_social/social.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AppDataSource } from '../../configs/database.config';

import { UserDetail } from './userDetail.entity';
import { SocialResponseDTO } from '../auth_social/social.dto';

export class UserService {
    private readonly userRepo: Repository<UserDetail>;
    private readonly socialRepo: Repository<Social>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(UserDetail);
        this.socialRepo = AppDataSource.getRepository(Social);
    }

    async getInfoUser(user: SocialResponseDTO): Promise<boolean> {
        const socialFind = await this.socialRepo.findOne({
            where: { socialName: user.socialName },
        });

        const userAccount = await this.userRepo
            .createQueryBuilder()
            .relation(Social, 'userAccount')
            .of(socialFind)
            .loadOne();

        if (!userAccount) return false;

        const userDetailFind = await this.userRepo
            .createQueryBuilder()
            .relation(UserAccount, 'userDetail')
            .of(userAccount)
            .loadOne();

        console.log(userDetailFind);

        if (!userDetailFind) return false;

        return userDetailFind;
    }

    async getUser(email: string, password: string): Promise<boolean> {
        return !(await this.userRepo.findOne({ where: {} }));
    }

    async updateUser(email: string, password: string): Promise<boolean | UpdateResult> {
        const userUpdate = await this.userRepo.findOne({
            where: {},
        });

        if (!userUpdate) return false;

        return await this.userRepo
            .createQueryBuilder()
            .update(UserDetail)
            .set({})
            .where('id = :id ', {
                id: userUpdate.id,
            })
            .returning('*')
            .execute();
    }
}
