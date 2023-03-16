export interface SocialDTO {
    name: string;
    failureFlash: string;
    successFlash: string;
    scopes: Array<string>;
    session: boolean;
    failureRedirect: string;
    successRedirect: string;
}
