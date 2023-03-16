import { Request } from 'express';
import passport, { PassportStatic } from 'passport';
import GitHubStrategy from 'passport-github2';
import { GithubResponse } from './githubResponse.dto';
import { AppDataSource } from '../../../configs/database.config';
import { UserAccount } from '../../user/userAccount.entity';
import { Social } from '../social.entity';

const githubStrategy = GitHubStrategy.Strategy;

const userAccountRepo = AppDataSource.getRepository(UserAccount);

const connect = (passport: PassportStatic): passport.PassportStatic => {
    passport.serializeUser(function (user: Express.User, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj: unknown, done) {
        done(null, obj);
    });

    passport.use(
        new githubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.URL_CALL_BACK_GITHUB,
                passReqToCallback: true,
            },
            async function (
                request: Request,
                accessToken: string,
                refreshToken: string,
                profile: GitHubStrategy.Profile,
                done: (error: any, user?: any) => void
            ): Promise<void> {
                try {
                    console.log(profile);
                    const userData: GithubResponse = {
                        url: profile.profileUrl,
                        name: profile.username,
                        photo: profile.photos,
                        token: {
                            accessToken,
                            refreshToken,
                        },
                    };
                    console.log(userData);
                    const userFind = await userAccountRepo.findOne({
                        where: { userNameAccount: userData.name },
                    });

                    if (!userFind) {
                        await AppDataSource.manager.transaction(
                            'SERIALIZABLE',
                            async transactionalEntityManager => {
                                await transactionalEntityManager
                                    .getRepository(Social)
                                    .save({ socialName: userData.url });

                                await transactionalEntityManager
                                    .getRepository(UserAccount)
                                    .save({ userNameAccount: userData.name });
                            }
                        );
                    }
                    return done(null, userData);
                } catch (err) {
                    console.log(err);
                    return done(null, false);
                }
            }
        )
    );

    return passport;
};

export const gitInit = { connect };
