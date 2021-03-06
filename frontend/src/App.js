import React, {Component} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import GamesContainer from './containers/GamesContainer';
import AccountContainer from './containers/AccountContainer';
import Start from './pages/Start';
import ProtectedPage from './pages/ProtectedPage';
import Page404 from './pages/Page404';
import LoginError from './pages/LoginError';
import OwnLevel from './pages/OwnLevel';
import MainContainer from './containers/MainContainer';
import { connect } from 'react-redux';
import './bootstrap.min.css';
import './style.css';
import {checkAuth} from "./actions/user";

const PrivateRoute = ({component: Component, data, path}) => {
  const {isAuth, checkAuth} = data;
  checkAuth();
  
  return <Route path={path}
    render={props => {
      return isAuth ? <Component {...props}/> : <ProtectedPage/>
    }
  }/>
}

class App extends Component {

  render() {
    return (
      <div className='wrapper'>
        <div className='sections'>
          <Router>
            <Route path='/' component={Header}/>
              <Switch>
                <Route exact path='/' component={MainContainer}/>
                <Route path='/games/' component={GamesContainer} />
                <PrivateRoute 
                  path='/account/'
                  data={this.props}
                  component={AccountContainer} />
                <PrivateRoute 
                  path='/creativity/'
                  data={this.props}
                  component={OwnLevel} />
                <Route path='/start/' component={Start}/>
                <Route path='/error/' component={LoginError}/>
                <Route component={Page404}/>
              </Switch>
          </Router>
        </div>
        <Footer />
      </div>
    );      
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.user.isAuth
  }
}

export default connect(mapStateToProps, {checkAuth})(App)










