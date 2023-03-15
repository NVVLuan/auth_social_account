import express from 'express';
import { ggInit } from '../../auth_social/google/google.init';
import { GoogleItem } from '../../auth_social/google/google.dto';
import { UserController } from './user.controller';

const googleItem = new GoogleItem();

const UserRouting = express.Router();

const userController = new UserController();

// UserRouting.post(`/signup`, userController.login);
UserRouting.get(`/login`, userController.login);
UserRouting.get(`/home`, userController.loginGoogle);

UserRouting.get(
    `/auth/google`,
    ggInit.authenticate({
        name: googleItem.name,
        scopes: googleItem.scopes,
    })
);
UserRouting.get(
    `/auth/google/callback`,
    ggInit.authenticateCallback({
        name: googleItem.name,
        failureRedirect: googleItem.failureRedirect,
        successRedirect: googleItem.successRedirect,
    }),
    userController.loginGoogle
);
UserRouting.get(`/signup`, userController.signup);

export { UserRouting };
