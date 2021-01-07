import React from 'react';

import { Link } from 'react-router-dom';

import burgerLogo from '../../assets/Images/burger-logo.png';
import styles from './Logo.module.css';
const logo = ( props ) => {
    return (
        <div className = { styles.Logo } style = { { height: props.height } }>
            <Link to="/">
                <img src = { burgerLogo } alt = "MyBurger" />
            </Link> 
        </div>
    );
}

export default logo;