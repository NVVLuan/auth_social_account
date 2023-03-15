import express from 'express';
import { UserRouting } from '../modules/user/user.router';

const server = express();

interface RouterItem {
    User: string;
}
enum RouterConstant {
    V1 = '/api/v1',
}

const routerCustom: RouterItem = {
    User: `${RouterConstant.V1}/user`,
};

export const configRouter = (app: typeof server) => {
    app.use(routerCustom.User, UserRouting);
};
