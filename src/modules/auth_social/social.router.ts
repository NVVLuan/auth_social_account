import { Github } from './social.config';
import express from 'express';
import { GoogleItem } from '../auth_social/google/google.dto';
import { Google } from './social.config';
import { GithubItem } from './github/github.dto';

const googleItem = new GoogleItem();
const google = new Google();
const githubItem = new GithubItem();
const github = new Github();

const SocialRouting = express.Router();

//login with google
SocialRouting.get(
    `/google`,
    google.authenticate({
        name: googleItem.name,
        scopes: googleItem.scopes,
        session: googleItem.session,
    })
);
SocialRouting.get(
    `/google/callback`,
    google.authenticateCallback({
        name: googleItem.name,
        successRedirect: googleItem.successRedirect,
        failureRedirect: googleItem.failureRedirect,
    })
);

SocialRouting.get(
    `/github`,
    github.authenticate({
        name: githubItem.name,
        scopes: githubItem.scopes,
        session: githubItem.session,
    })
);
SocialRouting.get(
    `/github/callback`,
    github.authenticateCallback({
        name: githubItem.name,
        successRedirect: githubItem.successRedirect,
        failureRedirect: githubItem.failureRedirect,
    })
);

export { SocialRouting };
