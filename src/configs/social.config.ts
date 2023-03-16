import { ggInit } from '../auth_social/google/google.config';
import passport = require('passport');

ggInit.connect(passport);

export { ggInit };
