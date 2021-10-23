import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './Components/NavbarComponents/Navbar'
import MainPage from './Components/MainPage/MainPage'
import Login from './Components/AuthenticationAndLogin/Login'
import Logout from './Components/AuthenticationAndLogin/Logout'
import { ProvideAuth, PrivateRoute } from "./Components/AuthenticationAndLogin/Auth";
import Loading from './Components/Loading/Loading'
import Anime from './Components/Anime/Anime';
import Forum from './Components/Forum/Forum';
import RankingSelect from './Components/Ranking/RankingSelect';
import Rerender from './Scripts/Rerender';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Register from './Components/AuthenticationAndLogin/Register';
import AnimeSearch from './Components/Anime/AnimeSearch';

function App() {
  const theme = createTheme({})
  /*Small method that rerender when screen dimensions change, found in Utilities*/
  Rerender()

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <ProvideAuth>  
            <Navbar />
            
            <Switch>
              <PrivateRoute path="/forum">
                <Forum />
              </PrivateRoute>

              <Route exact path='/'>
                <MainPage />
              </Route>

              <Route path='/anime/:id' render={(props) => <Anime id={props.match.params.id as unknown as number} />}/>

              <Route path='/rankings'>
                <RankingSelect />
              </Route>

              <Route path="/search">
                <AnimeSearch />
              </Route>

              <Route path='/loading'>
                <Loading />
              </Route>

              <Route path='/login'>
                <Login />
              </Route>

              <Route path='/register'>
                <Register />
              </Route>

              <Route path="/logout">
                <Logout/>
              </Route>
            </Switch>
          </ProvideAuth>
        </Router>
      </ThemeProvider>

      <div id="AchievementDialogContainer"></div>
    </div>
  );
}


export default App;
