import { AppDataSource } from '../../configs/database.config';
import { User } from './user.entity';

export class UserService {
    private userRepo = AppDataSource.getRepository(User);
}
