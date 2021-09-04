import { Switch, Route } from "react-router-dom";
import { ForumCategory } from "../../data/Forum/ForumCategory";
import NewestThreads from "./NewestThreads";
import ThreadsByCategory from "./ThreadsByCategory";
import ThreadSearch from "./ThreadSearch";

interface ForumSwitchProps {
    categories: ForumCategory[];
}

export default function ForumSwitch(props: ForumSwitchProps) {
    const { categories } = props

    return (
        <Switch>
            <Route exact path="/forum/Newest" ><NewestThreads /></Route>
            <Route exact path="/forum/Search" ><ThreadSearch /></Route>
            <Route path="/forum/:category" render={(props) => 
                <ThreadsByCategory category={categories.find((category: ForumCategory) => category.categoryName === props.match.params.category)!} />} 
            />
        </Switch>
    )
}