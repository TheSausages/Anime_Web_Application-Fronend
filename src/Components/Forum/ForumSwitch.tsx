import { Switch, Route } from "react-router-dom";
import { ForumCategory } from "../../data/Forum/ForumCategory";
import NewestThreads from "./Thread/NewestThreads";
import ThreadsByCategory from "./Thread/ThreadsByCategory";
import ThreadSearch from "./Thread/ThreadSearch";
import CompleteThreadComponent from "./Thread/CompleteThreadComponent";
import ComponentWithNewThreadButton from "./Thread/ComponentWithNewThreadButton";

interface ForumSwitchProps {
    categories: ForumCategory[];
}

export default function ForumSwitch(props: ForumSwitchProps) {
    const { categories } = props

    return (
        <div>
            <Switch>
                {/*These have Only Thread Button*/}
                <Route exact path="/forum/Newest" ><ComponentWithNewThreadButton categories={categories} >
                    <NewestThreads />    
                </ComponentWithNewThreadButton></Route>
                <Route exact path="/forum/Search" ><ComponentWithNewThreadButton categories={categories} >
                    <ThreadSearch categories={categories} />    
                </ComponentWithNewThreadButton></Route>
                <Route exact path="/forum/:category" render={(props) => 
                    <ComponentWithNewThreadButton  categories={categories} children={
                        <ThreadsByCategory category={categories.find((category: ForumCategory) => category.categoryName === props.match.params.category)!} />
                    } />} 
                />

                {/*Custom number of Buttons, inside*/}
                <Route exact path="/forum/thread/:id" render={(props) => 
                    <CompleteThreadComponent threadId={Number(props.match.params.id)} categories={categories} />} 
                />
            </Switch>
        </div>
    )
}