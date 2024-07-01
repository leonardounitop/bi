import React from 'react'
import Logo from '../../assets/logounitop.svg?react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className={styles.header}>
            <nav className={`${styles.nav}`}>

                <Link to='/abastecimento' >
                    a
                </Link>

                <Link to="/pneu">
                    <div>menu navegacao</div>
                </Link>
            </nav>
        </header>
    )
}

export default Header