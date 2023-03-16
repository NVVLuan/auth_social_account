import { Request, Response } from 'express';
import { ResponseCustom } from '../../utils/errors/responseError';
import { UserService } from './user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    loginPage(req: Request, res: Response): void {
        return res.render('login');
    }
    signupPage(req: Request, res: Response): void {
        return res.render('signup');
    }

    homePage(req: Request, res: Response): void {
        return res.render('home');
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const data = await this.userService.getUser(email, password);
            console.log(data);
            if (data) return res.render('home');

            return res
                .status(200)
                .json(new ResponseCustom('error', 'email or password error').get());
        } catch (err) {
            console.log(err);
            return res.status(400).json(new ResponseCustom('error', 'server error').get());
        }
    };
}
