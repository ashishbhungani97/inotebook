import React from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './components/Signup';
import UserState from './context/notes/UserState';
export default function App() {
  return (
    <UserState>
    <Router>
     
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>

      </div>
    </Router>
    </UserState>
  )
}

