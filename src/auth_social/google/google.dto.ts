import dotenv from 'dotenv';

dotenv.config();

const {
    NAME_GOOGLE,
    FAILURE_FLASH,
    SUCCESS_FLASH,
    SCOPES_PROFILE,
    SCOPES_EMAIL,
    FAILURE_REDIRECT,
    SUCCESS_REDIRECT,
} = process.env;

export interface GoogleDTO {
    name: string;
    failureFlash: string;
    successFlash: string;
    scopes: Array<string>;
    session: boolean;
    failureRedirect: string;
    successRedirect: string;
}

export class GoogleItem implements GoogleDTO {
    name = NAME_GOOGLE;
    failureFlash = FAILURE_FLASH;
    successFlash = SUCCESS_FLASH;
    scopes = [SCOPES_PROFILE, SCOPES_EMAIL];
    session = false;
    failureRedirect = FAILURE_REDIRECT;
    successRedirect = SUCCESS_REDIRECT;
}
