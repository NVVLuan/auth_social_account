import express from 'express';
import { GoogleItem } from '../../auth_social/google/google.dto';
import { ggInit } from '../../configs/social.config';
import { UserController } from './user.controller';

const googleItem = new GoogleItem();

const UserRouting = express.Router();

const userController = new UserController();

UserRouting.post(`/login/`, userController.login);
UserRouting.get(`/login`, userController.loginPage);
UserRouting.get(`/home`, userController.homePage);
UserRouting.get(`/signup`, userController.signupPage);

//login with google
UserRouting.get(
    `/auth/google`,
    ggInit.authenticate({
        name: googleItem.name,
        scopes: googleItem.scopes,
        session: googleItem.session,
    })
);
UserRouting.get(
    `/auth/google/callback`,
    ggInit.authenticateCallback({
        name: googleItem.name,
        successRedirect: googleItem.successRedirect,
        failureRedirect: googleItem.failureRedirect,
    })
);

export { UserRouting };
