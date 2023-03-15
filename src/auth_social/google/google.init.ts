import { ggInit } from './google.config';
import passport = require('passport');

ggInit.connect(passport);

export { ggInit };
