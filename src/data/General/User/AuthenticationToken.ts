/**
 * Tokens and token data recieved after successful login or registration.
 */
export interface AuthenticationToken {
    /** Token used to authenticate the user. */
    access_token: string;

    /** Time after current time, after which the current access token will expire. */
    expires_in: number;

    /** Token used to refresh the access token. */
    refresh_token: string;

    /** What type is th access token, example: 'Bearer' */
    token_type: string;
}