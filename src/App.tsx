import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';


import AddMovie from './components/AddMovie'
import Search from './components/Search'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light">
            <ul className="nav navbar-nav">


                <li><Link to="/My_movies">My movies</Link></li>
                <li><Link to="/search">/Search</Link></li>


            </ul>
        </nav>
            <Route path = '/My_movies'component = {AddMovie}/>
            <Route path = '/Search' component = {Search}/>
      </div>
    );
  }
}

export default App;
