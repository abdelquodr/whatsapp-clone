import './App.css';
import React, { useState } from 'react'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useStateValue } from './StateProvider'


function App() {

  const [{ user }] = useStateValue()

  return (
    // using BEM naming convention for CSS

    <div className="app">
      <div className="app__body">
        {!user ? (
          <Login />
        ) : (
            <Router>
              <Switch>

                <Route path='/rooms/:roomId'>
                  <Sidebar />
                  <Chat />
                </Route>

                <Route exact path='/'>
                  <h1>This is home page</h1>
                </Route>
              </Switch >
            </Router >)
        }
      </div >
    </div >
  );
}

export default App;
