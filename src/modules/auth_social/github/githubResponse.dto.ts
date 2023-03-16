export interface GithubResponse {
    url: string;
    name: string;
    photo:
        | Array<{
              value: string;
          }>
        | undefined;
    token: {
        accessToken: string;
        refreshToken: string;
    };
}
