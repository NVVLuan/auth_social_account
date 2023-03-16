import passport = require('passport');
import { gitInit } from './github/github.config';
import { ggInit } from './google/google.config';
import { SocialDTO } from './social.dto';

class PassportAuth {
    // Submit request for authentication by Google.
    authenticate = (config: Partial<SocialDTO>): any => {
        return passport.authenticate(config.name, {
            scope: config.scopes,
            failureFlash: config.failureFlash,
            successFlash: config.successFlash,
            session: config.session,
        });
    };

    // Callback after authentication request is executed.
    authenticateCallback = (config: Partial<SocialDTO>): any => {
        return passport.authenticate(config.name, {
            successRedirect: config.successRedirect,
            failureRedirect: config.failureRedirect,
        });
    };
}

export class Google extends PassportAuth {
    constructor() {
        super();
        ggInit.connect(passport);
    }
}

export class Github extends PassportAuth {
    constructor() {
        super();
        gitInit.connect(passport);
    }
}
