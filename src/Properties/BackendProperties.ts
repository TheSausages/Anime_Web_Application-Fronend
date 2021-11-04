/**
 * Properties file containing backend props.
 * Properties that need parameters need to be a function
*/

export const BackendProperties = {
    backendUrl: "http://192.168.0.245:8080",
    authAndUser: {
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