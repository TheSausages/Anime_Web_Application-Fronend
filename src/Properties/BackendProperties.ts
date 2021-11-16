/**
 * This file contains properties that are connected to connecting to the backend, such as a *base backend url*.
 * Name of the property is `MUST` be the same as the method in a given service.
 * - `backendUrl` - The basic backend url
 * - `authAndUser` - Urls connected to general user stuff, like authentification
 * - `anime` - Urls connected to anime, such as retrieving a specific anime or updating anime user information
 * - `forum` - Urls connected to the forum, such as thread creation or post edition
*/

export const BackendProperties = {
    backendUrl: "http://192.168.0.245:8080/api",
    authAndUser: {
        getUserProfile(userId: string) {
            return `${BackendProperties.backendUrl}/user/${userId}`
        },
        get currentUserProfile() {
            return `${BackendProperties.backendUrl}/user/current`
        },
        get login() {
            return `${BackendProperties.backendUrl}/auth/login`
        },
        get logout() {
            return `${BackendProperties.backendUrl}/auth/logout`
        },
        get register() {
            return `${BackendProperties.backendUrl}/auth/register`
        },
        get refreshAuthTokensUrl() {
            return `${BackendProperties.backendUrl}/auth/refreshToken`
        },
        get achievementSubscribe() {
            return `${BackendProperties.backendUrl}/achievements/subscribe`
        },
        get cancelAchievementsSubscription() {
            return `${BackendProperties.backendUrl}/achievements/cancel`
        },
    },
    anime: {
        getAnimeById(id: number) {
            return `${BackendProperties.backendUrl}/anime/${id}`
        },
        get updateAnimeUserInformation() {
            return `${BackendProperties.backendUrl}/anime/updateUserAnime`
        },
        get getCurrentSeasonAnime() {
            return `${BackendProperties.backendUrl}/anime/season/current`
        },
        getTopAnimeOfAllTime(pageNumber: number) {
            return `${BackendProperties.backendUrl}/anime/ranking/topAllTime/${pageNumber}`
        },
        getTopAiringAnime (pageNumber: number) {
            return `${BackendProperties.backendUrl}/anime/ranking/topAiring/${pageNumber}`
        },
        getTopAnimeMovies(pageNumber: number) {
            return `${BackendProperties.backendUrl}/anime/ranking/topMovies/${pageNumber}`
        },
        searchByQuery(pageNumber: number) {
            return `${BackendProperties.backendUrl}/anime/search/${pageNumber}`
        }
    },
    forum: {
        get getForumCategories() {
            return `${BackendProperties.backendUrl}/forum/categories`
        },
        get createThread() {
            return `${BackendProperties.backendUrl}/forum/thread`
        },
        get getTags() {
            return `${BackendProperties.backendUrl}/forum/tags`
        },
        getNewestThread(page: number) {
            return `${BackendProperties.backendUrl}/forum/thread/newest/${page}`
        },
        searchThreadsByQuery(page: number) {
            return `${BackendProperties.backendUrl}/forum/thread/search/${page}`
        },
        getThreadById(id: number) {
            return `${BackendProperties.backendUrl}/forum/thread/${id}`
        },
        getPostsForThread(threadId: number, page: number) {
            return `${BackendProperties.backendUrl}/forum/thread/${threadId}/post/${page}`
        },
        updatePostUserStatus(postId: number) {
            return `${BackendProperties.backendUrl}/forum/post/${postId}`
        },
        updateThreadUserStatus(threadId: number) {
            return `${BackendProperties.backendUrl}/forum/thread/${threadId}/status`
        },
        createPostForThread(threadId: number) {
            return `${BackendProperties.backendUrl}/forum/thread/${threadId}/post`
        },
        updatePostForThread(threadId: number) {
            return `${BackendProperties.backendUrl}/forum/thread/${threadId}/post`
        },
        updateThread(threadId: number) {
            return `${BackendProperties.backendUrl}/forum/thread/${threadId}`
        }
    }
}