import { Switch, Route } from "react-router-dom";
import Threads from "./Threads";
import ThreadSearch from "./ThreadSearch";

interface ForumSwitchProps {}

export default function ForumSwitch(props: ForumSwitchProps) {
    return (
        <Switch>
            <Route exact path="/forum/newest" ><Threads /></Route>
            <Route exact path="/forum/search" ><ThreadSearch /></Route>
        </Switch>
    )
}