import express from 'express';
import { UserController } from './user.controller';

const UserRouting = express.Router();

const userController = new UserController();

UserRouting.post(`/login/`, userController.login);
UserRouting.get(`/login`, userController.loginPage);
UserRouting.get(`/home`, userController.homePage);
UserRouting.get(`/signup`, userController.signupPage);

export { UserRouting };
