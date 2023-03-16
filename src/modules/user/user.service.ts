import { Repository } from 'typeorm';
import { AppDataSource } from '../../configs/database.config';
import { User } from './user.entity';

export class UserService {
    private readonly userRepo: Repository<User>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
    }

    async getUser(email: string, password: string): Promise<boolean> {
        console.log(
            !!(await this.userRepo.findOne({ where: { email: email, password: password } }))
        );
        return !!(await this.userRepo.findOne({ where: { email: email, password: password } }));
    }
}
