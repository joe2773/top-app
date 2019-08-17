import * as React from 'react';
import { Link, Route } from 'react-router-dom';


import Home from './components/Home'
import Login from './components/Login'
import Search from './components/Search'
import TopTen from './components/TopTen'

 import './CSS/App.css'
 import './CSS/NavBar.css'

interface IAppState {
    isLoggedIn:any,
    userId: any
}

class App extends React.Component<{},IAppState> {


  public constructor(props:any){
      super(props)



      this.state = {
          isLoggedIn: false,
          userId: ''
      }
      this.passSearchProps = this.passSearchProps.bind(this)
      this.passHomeProps = this.passHomeProps.bind(this)
      this.loginCallBack = this.loginCallBack.bind(this)
  }
  public passSearchProps = (props:any) =>{
      return(
          <Search userId = {this.state.userId}/>
      )
  }
  public passTopTenProps = (props:any)=>{
      return(
          <TopTen userId = {this.state.userId}/>
      )
  }
  public passHomeProps = (props:any) =>{
      return(
          <Home userId = {this.state.userId}/>
      )
  }
  public loginCallBack(response:any){
      // sets isLoggedIn to true once the facebook login returns a valid login response


     this.setState({
         isLoggedIn: true,
         userId: response.id
     })
  }
  public render() {
      const exact = true
     if(this.state.isLoggedIn){
    return (
      <div id = 'top-background' className = "app">
      <div>logo</div>
        <nav className="nav-grid-container">
                <ul className = 'nav-grid-item'><Link to="/Search">Search</Link></ul>
                <ul className = 'nav-grid-item' ><Link to="/Home">  Profile </Link></ul>
                <ul className = 'nav-grid-item'><Link to="/TopTen"> Top Ten Movies </Link></ul>

        </nav>

            <Route path = '/Search' render = {this.passSearchProps}/>
            <Route path = '/TopTen' render = {this.passTopTenProps}/>
            <Route exact = {exact} path = '/' render = {this.passHomeProps}/>
            <Route  path = '/home' render = {this.passHomeProps}/>
      </div>
    );
} else {
    return(
        <div>
        <Login loginCallBack = {this.loginCallBack}/>
        </div>
    )
}
  }
}

export default App;
