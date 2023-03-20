import { SocialResponseDTO } from './../auth_social/social.dto';
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

    homePage = async (req: Request, res: Response): Promise<void | Response> => {
        return res.render('home', {
            user: req.user,
        });
        // try {
        //     const data = await this.userService.getInfoUser(req.user as SocialResponseDTO);

        //     if (data)
        //         return res.render('home', {
        //             user: req.user,
        //         });

        //     return res.render('error');
        // } catch (err) {
        //     console.log(err);
        //     return res.status(400).json(new ResponseCustom('error', 'server error').get());
        // }
    };

    login = async (req: Request, res: Response): Promise<void | Response> => {
        const { email, password } = req.body;
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<void | Response>(async resolve => {
            try {
                const data = await this.userService.getUser(email, password);
                console.log(data);
                if (data)
                    resolve(
                        res.render('home', {
                            user: {
                                email: email,
                                name: 'Account',
                                photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Google_Zircon.svg',
                            },
                        })
                    );

                resolve(res.render('error'));
            } catch (err) {
                console.log(err);
                resolve(res.status(400).json(new ResponseCustom('error', 'server error').get()));
            }
        });
    };

    updateUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const data = await this.userService.updateUser(email, password);
            console.log(data);
            if (data)
                return res.render('home', {
                    user: data,
                });

            return res.render('error');
        } catch (err) {
            console.log(err);
            return res.status(400).json(new ResponseCustom('error', 'server error').get());
        }
    };
}
