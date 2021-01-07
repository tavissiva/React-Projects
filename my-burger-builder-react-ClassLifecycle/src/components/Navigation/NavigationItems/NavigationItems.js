import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = ( props ) => {
    return ( 
        <ul className = { styles.NavigationItems }>
            <NavigationItem link = "/"  clicked={props.closedSideBar}> Burger Builder </NavigationItem> 
            { props.isAuthenticated 
                ? <NavigationItem link = "/orders" clicked={props.closedSideBar}> Orders </NavigationItem>
                : null
            }
            { !props.isAuthenticated 
                ? <NavigationItem link = "/auth" clicked={props.closedSideBar}> Authenticate </NavigationItem>
                : <NavigationItem link = "/logout" clicked={props.closedSideBar}> Logout </NavigationItem>
            }
            
        </ul>
    );
}

export default navigationItems;