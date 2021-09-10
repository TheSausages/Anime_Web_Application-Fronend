import { useSnackbar } from "notistack";
import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CompletePost, CompletePostPage } from "../../../data/Forum/Post";
import { BackendError } from "../../../data/General/BackendError";
import { PageDTO } from "../../../data/General/PageDTO";
import { snackbarError } from "../../../data/General/SnackBar";
import { ForumService } from "../../../Scripts/Services/ForumService";
import Loading from "../../Loading/Loading";
import PostComponent from "../Post/PostComponent";

interface ThreadPostsComponentProps {
    postsPage: PageDTO<CompletePost>;
    threadId: number;
}

export default function ThreadPostsComponent(props: ThreadPostsComponentProps) {
    const [postPage, setPostPage] = useState<CompletePostPage>(props.postsPage)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const { enqueueSnackbar } = useSnackbar();

    const getMorePosts= useCallback(async () => {
        await ForumService.getPostsForThread(props.threadId, postPage.pageNumber + 1)
        .then((response: CompletePostPage) => setPostPage({...response, content: [...postPage.content, ...response.content]}))
        .catch((error: BackendError) => {
            setError(error.message)
            enqueueSnackbar(error.message, snackbarError)
        })
    }, [enqueueSnackbar, postPage, props.threadId])

    useEffect(() => {
        try {
            setLoading(true);

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("An unknown Error occured!")
        }
    }, []);

    if (loading || postPage === undefined) {
        return <Loading error={error}/>
    }

    if (postPage!.content.length < 1) {
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
                    <PostComponent post={post} key={index} />
                ))
            }
        </InfiniteScroll>
    )
}