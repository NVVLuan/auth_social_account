export interface GoogleResponse {
    email: string;
    name: string;
    photo: string;
    locale: string;
    token: {
        accessToken: string;
        refreshToken: string;
    };
}
