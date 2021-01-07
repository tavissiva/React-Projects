import React from 'react';

import styles from './Loader.module.css';

const spinner = () => {
    return (
        <div className={ styles.Loader }>Loading...</div>
    );
}

export default spinner;