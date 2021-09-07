import { Switch, Route } from "react-router-dom";
import { ForumCategory } from "../../data/Forum/ForumCategory";
import NewestThreads from "./Thread/NewestThreads";
import ThreadsByCategory from "./Thread/ThreadsByCategory";
import ThreadSearch from "./Thread/ThreadSearch";
import CompleteThreadComponent from "./Thread/CompleteThreadComponent";

interface ForumSwitchProps {
    categories: ForumCategory[];
}

export default function ForumSwitch(props: ForumSwitchProps) {
    const { categories } = props

    return (
        <Switch>
            <Route exact path="/forum/Newest" ><NewestThreads /></Route>
            <Route exact path="/forum/Search" ><ThreadSearch /></Route>
            <Route exact path="/forum/:category" render={(props) => 
                <ThreadsByCategory category={categories.find((category: ForumCategory) => category.categoryName === props.match.params.category)!} />} 
            />
            <Route exact path="/forum/thread/:id" render={(props) => 
                <CompleteThreadComponent threadId={Number(props.match.params.id)} />} 
            />
        </Switch>
    )
}