import './App.css';
import { ProvideAuth, PrivateRoute } from "./Components/AuthenticationAndLogin/Auth";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './Components/NavbarComponents/Navbar'
import MainPage from './Components/MainPage/MainPage'
import Login from './Components/AuthenticationAndLogin/Login'

import Loading from './Components/Loading'
import Anime from './Components/Anime/Anime';

function App() {
  return (
    <div className="App">
      <Router>
        <ProvideAuth>
          <Navbar />

          <Switch>
            <PrivateRoute path='/forum'>
              <Anime />
            </PrivateRoute>

            <Route exact path='/'>
              <MainPage />
            </Route>

            <Route path='/anime/:id' component={Anime}/>

            <Route path='/loading'>
              <Loading />
            </Route>

            <Route path='/login'>
              <Login out={false}/>
            </Route>

            <Route path="/logout">
            <Login out={true}/>
            </Route>

          </Switch>
        </ProvideAuth>
      </Router>
    </div>
  );
}


export default App;
