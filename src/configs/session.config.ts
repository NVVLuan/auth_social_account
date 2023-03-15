import express from 'express';
import session from 'express-session';
// import RedisStore from 'connect-redis';

const server = express();

export const sessionConfig = (app: typeof server) => {
    app.use(
        session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true },
        })
    );
};
