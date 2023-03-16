import { Repository } from 'typeorm';
import { AppDataSource } from '../../configs/database.config';

import { UserDetail } from './userDetail.entity';

export class UserService {
    private readonly userRepo: Repository<UserDetail>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(UserDetail);
    }

    async getUser(email: string, password: string): Promise<boolean> {
        console.log(
            !!(await this.userRepo.findOne({ where: { email: email, password: password } }))
        );
        return !!(await this.userRepo.findOne({ where: { email: email, password: password } }));
    }
}
