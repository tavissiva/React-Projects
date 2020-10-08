import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = ( props ) => {
    let attachedSideDrawerStyles = [ styles.SideDrawer, styles.Close];
    if( props.open) {
        attachedSideDrawerStyles = [ styles.SideDrawer, styles.Open ];
    }
    return (
        
        <React.Fragment>
            <BackDrop show = { props.open } clicked = { props.closed }/>
            <div className = { attachedSideDrawerStyles.join(' ') } >
            <div className = { styles.Logo }>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </React.Fragment>

    );
}



export default sideDrawer;