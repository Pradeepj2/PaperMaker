import React, { Component } from 'react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../src/store/store/actions/index';
import Frontside from './Components/FrontSide/Frontside';

class App extends Component {
  componentDidMount() {
    this.props.onAuthSignIn()
  }

  render() { 
    
    return (
    <BrowserRouter>
    <div>
      <Frontside/>
    </div>
    </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.reducer.idToken != null
   }
}

const mapDispathchToProps = dispatch => {
  return{
      onAuthSignIn : () => dispatch(actions.authCheckState()) ,
 }
} 

export default connect(mapStateToProps,mapDispathchToProps)( App)
