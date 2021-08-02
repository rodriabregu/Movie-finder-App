import './App.css';
import { Route } from 'react-router-dom';
import React from 'react';
import Favorites from './components/Favorites';
import Movie from './components/Movie';
import Search from './components/Search';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Search}/>
      <Route exact path="/favorites" component={Favorites}/>
      <Route exact path="/movie/:id" component={Movie}/>
    </React.Fragment>
  );
}

export default App;
