import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CompletePost, CompletePostPage } from "../../../data/Forum/Post";
import { BackendError } from "../../../data/General/BackendError";
import useBasicState from "../../../data/General/BasicState";
import { PageDTO } from "../../../data/General/PageDTO";
import { snackbarError } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import PostComponent from "../Post/PostComponent";

/**
 * The props for the {@link ThreadPostsComponent} component.
 */
export interface ThreadPostsComponentProps {
    /** Page of posts to be shown. */
    postsPage: PageDTO<CompletePost>;

    /** Id of the thread to which the posts belong. */
    threadId: number;
}

/**
 * Component for displaying posts. When the user scrolls down to the last post, more will be loaded.
 * @param props {@link ThreadPostsComponentProps}
 */
export default function ThreadPostsComponent(props: ThreadPostsComponentProps) {
    const { postsPage, threadId } = props;
    const [postPage, setPostPage] = useState<CompletePostPage>(postsPage)
    const { loading, error, startLoading, stopLoading, snackbar, setErrorMessage, t, i18n } = useBasicState()

    useEffect(() => {
        startLoading()

        setPostPage(postsPage)

        stopLoading()
    }, [props.postsPage, postsPage, startLoading, stopLoading])

    const getMorePosts= useCallback(async () => {
        await ForumService.getPostsForThread(threadId, postPage.pageNumber + 1, t, i18n)
        .then((response: CompletePostPage) => setPostPage({...response, content: [...postPage.content, ...response.content]}))
        .catch((error: BackendError) => {
            setErrorMessage(error.message)
            snackbar(error.message, snackbarError)
        })
    }, [snackbar, setErrorMessage, postPage, threadId, t, i18n])

    if (loading || postPage === undefined) {
        return <Loading error={error}/>
    }

    return (
        <InfiniteScroll
            style={{overflow: 'hidden'}}
            dataLength={postPage.content.length}
            next={() => getMorePosts()}
            hasMore={!postPage.last}
            loader={<Loading />}
        >
            {
                postPage.content.map((post, index) => (
                    <PostComponent post={post} key={index} threadId={threadId} />
                ))
            }
        </InfiniteScroll>
    )
}