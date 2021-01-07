import React, { Component } from 'react';
import { connect } from 'react-redux';


import FragmentHOC from '../../hoc/Fragment';
import layoutStyles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => { 
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  render() {
      return (
        <FragmentHOC>
          <Toolbar 
            isAuth = {this.props.isAuthenticated }
            drawerToggleClicked = {this.sideDrawerToggleHandler} 
          />
          <SideDrawer 
            isAuth = {this.props.isAuthenticated }
            open = {this.state.showSideDrawer } 
            closedSideBar={this.sideDrawerClosedHandler} />
          <main className={ layoutStyles.Content }>
            { this.props.children }
          </main>
        </FragmentHOC>
        
      );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}
export default connect(mapStateToProps, null)(Layout);