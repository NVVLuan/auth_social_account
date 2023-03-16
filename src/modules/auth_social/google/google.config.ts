import { Request } from 'express';
import passport, { PassportStatic } from 'passport';
import GoogleStrategy, { Profile, VerifyCallback } from 'passport-google-oauth20';
import { GoogleResponse } from './googleResponse.dto';

// import password_codes from 'voucher-code-generator';
import { AppDataSource } from '../../../configs/database.config';
import { Social } from '../social.entity';
import { UserAccount } from '../../user/userAccount.entity';
import { UserDetail } from '../../user/userDetail.entity';

const googleStrategy = GoogleStrategy.Strategy;

const socialRepo = AppDataSource.getRepository(Social);

const connect = (passport: PassportStatic): passport.PassportStatic => {
    passport.serializeUser(function (user: Express.User, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj: unknown, done) {
        done(null, obj);
    });

    passport.use(
        new googleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.URL_CALL_BACK_GOOGLE,
                passReqToCallback: true,
            },
            async function (
                req: Request,
                accessToken: string,
                refreshToken: string,
                profile: Profile,
                done: VerifyCallback
            ): Promise<void> {
                try {
                    const userData: GoogleResponse = {
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        photo: profile._json.picture,
                        locale: profile._json.locale,
                        token: {
                            accessToken,
                            refreshToken,
                        },
                    };

                    //validate email into database
                    const userFind = await socialRepo.findOne({
                        where: { socialName: userData.email },
                    });
                    console.log(userFind);
                    if (!userFind) {
                        await AppDataSource.manager.transaction(
                            'SERIALIZABLE',
                            async transactionalEntityManager => {
                                const socialNew = await transactionalEntityManager
                                    .getRepository(Social)
                                    .save({ socialName: userData.email });

                                const userAccount = await transactionalEntityManager
                                    .getRepository(UserAccount)
                                    .save({ userNameAccount: userData.name });

                                await transactionalEntityManager
                                    .createQueryBuilder()
                                    .relation(UserAccount, 'socials')
                                    .of(userAccount)
                                    .add(socialNew);

                                const userDetail = await transactionalEntityManager
                                    .getRepository(UserDetail)
                                    .save({
                                        firstName: userData.name.slice(
                                            0,
                                            userData.name.indexOf(' ')
                                        ),
                                        lastName: userData.name.slice(
                                            userData.name.indexOf(' '),
                                            userData.name.length
                                        ),
                                        email: userData.email,
                                        password: process.env.PASSWORD_ACCOUNT,
                                    });

                                await transactionalEntityManager
                                    .createQueryBuilder()
                                    .relation(UserAccount, 'userDetail')
                                    .of(userAccount)
                                    .set(userDetail);
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

export const ggInit = { connect };
