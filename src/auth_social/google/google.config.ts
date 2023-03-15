import { GoogleDTO } from './google.dto';
import GoogleStrategy, { Profile, VerifyCallback } from 'passport-google-oauth20';

const googleStrategy = GoogleStrategy.Strategy;
import passport, { PassportStatic } from 'passport';
import { GoogleResponse } from './googleResponse.dto';
import { Request } from 'express';

const connect = (passport: PassportStatic) => {
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
            function (
                req: Request,
                accessToken: string,
                refreshToken: string,
                profile: Profile,
                done: VerifyCallback
            ): void {
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

                done(null, userData);
            }
        )
    );
};

// Submit request for authentication by Google.
const authenticate = (config: Partial<GoogleDTO>) => {
    return passport.authenticate(config.name, {
        scope: config.scopes,
        failureFlash: config.failureFlash,
        successFlash: config.successFlash,
        session: config.session,
    });
};

// Callback after authentication request is executed.
const authenticateCallback = (config: Partial<GoogleDTO>) => {
    return passport.authenticate(config.name, {
        successRedirect: config.successRedirect,
        failureRedirect: config.failureRedirect,
    });
};

export const ggInit = { connect, authenticate, authenticateCallback };
