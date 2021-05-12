import React from "react";
import Nav2 from "./components/nav";
import ShannonApiCall from "./requests/shannon-api-call";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NbaRequest from "./requests/nba-request";
import Request from "./requests/request";
import MlbRequest from "./requests/MlbRequest";
import NhlRequest from "./requests/NhlRequest";
import NhlStandings from "./components/nhl/NhlStandings";
import NhlTeams from "./components/nhl/NhlTeams";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav2/>
          <Switch>
            <Route exact path="/" component={ ShannonApiCall }/>
            <Route path="/nba" component={ NbaRequest }/>
            <Route path="/cfb" component={ Request }/>
            <Route path="/mlb" component={ MlbRequest }/>
            <Route path="/nhl" component={ NhlRequest }/>
            <Route path="/standings" component={ NhlStandings }/>
            <Route path="/teams" component={ NhlTeams }/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
