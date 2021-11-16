/**
 * This file contains properties that have something to do with user authentication.
 * - `usernameItem` - Name of the *localStorage* item that holds the Username
 * - `accessTokenItem` - Name of the *localStorage* item that holds the access token, used to access secured resources in backend
 * - `refreshTokenItem` - Name of the *localStorage* item that holds the refresh token, used to refresh the access token
 * - `refreshIfAfterItem` - Name of the *localStorage* item that holds the time after which the access token must be refreshed
 */

export const AuthenticationProperties = {
    usernameItem: "username",
    accessTokenItem: "accessToken",
    refreshTokenItem: "refreshToken",
    refreshIfAfterItem: "refreshIfAfter"
}