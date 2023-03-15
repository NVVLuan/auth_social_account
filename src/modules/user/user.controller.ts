import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    login(req: Request, res: Response) {
        return res.render('login');
    }

    loginGoogle(req: Request, res: Response) {
        console.log(req);
        return res.render('home');
    }

    signup(req: Request, res: Response) {
        return res.render('signup');
    }
}
