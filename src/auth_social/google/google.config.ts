import { AppDataSource } from './../../configs/database.config';
import { GoogleDTO } from './google.dto';
import GoogleStrategy, { Profile, VerifyCallback } from 'passport-google-oauth20';
import passport, { PassportStatic } from 'passport';
import { GoogleResponse } from './googleResponse.dto';
import { Request } from 'express';
import { User } from '../../modules/user/user.entity';
import password_codes from 'voucher-code-generator';
import { nodeMailer } from '../../configs/nodemailer.config';

const userRepo = AppDataSource.getRepository(User);
const googleStrategy = GoogleStrategy.Strategy;

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
                callbackURL: process.env.URL_CALL_BACK,
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
                    const userFind = await userRepo.findOne({
                        where: { email: userData.email },
                    });
                    console.log(userFind);
                    if (!userFind) {
                        const password_code = password_codes.generate({
                            pattern: '########',
                        })[0];

                        const userNew = await userRepo.save({
                            userName: userData.name,
                            email: userData.email,
                            password: password_code,
                        });
                        try {
                            await nodeMailer({
                                from: process.env.ADMIN_EMAIL,
                                to: userNew.email as string,
                                subject: process.env.SUBJECT_EMAIL,
                                title: process.env.TITLE_EMAIL,
                                content: `${password_code}`,
                            });
                        } catch (err) {
                            await userRepo.delete({ id: userNew.id });

                            return done(null, false);
                        }
                    }

                    return done(null, userData);
                } catch (err) {
                    return done(null, false);
                }
            }
        )
    );

    return passport;
};

// Submit request for authentication by Google.
const authenticate = (config: Partial<GoogleDTO>): any => {
    return passport.authenticate(config.name, {
        scope: config.scopes,
        failureFlash: config.failureFlash,
        successFlash: config.successFlash,
        session: config.session,
    });
};

// Callback after authentication request is executed.
const authenticateCallback = (config: Partial<GoogleDTO>): any => {
    return passport.authenticate(config.name, {
        successRedirect: config.successRedirect,
        failureRedirect: config.failureRedirect,
    });
};

export const ggInit = { connect, authenticate, authenticateCallback };
