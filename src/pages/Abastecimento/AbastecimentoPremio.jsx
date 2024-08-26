import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import styles from './AbastecimentoPremio.module.css';
import Sintetico from './Premio/Sintetico';
import Analitico from './Premio/Analitico';
import Media from './Premio/Media';

function AbastecimentoPremio() {

    const { pathname } = useLocation();



    return (
        <section className='animeLeft'>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink to="" end
                            style={{ backgroundColor: !pathname.includes('analitico') && !pathname.includes('media') ? '#3b82f6' : '#1e3a8a' }}>Sintético</NavLink>
                    </li>
                    <li>
                        <NavLink to="analitico"
                            style={{ backgroundColor: pathname.includes('analitico') ? '#3b82f6' : '#1e3a8a' }}>Analítico</NavLink>
                    </li>
                    <li>
                        <NavLink to="media"
                            style={{ backgroundColor: pathname.includes('media') ? '#3b82f6' : '#1e3a8a' }}>média</NavLink>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Sintetico />} />
                <Route path="analitico" element={<Analitico />} />
                <Route path="media" element={<Media />} />
            </Routes>
        </section>
    );
}

export default AbastecimentoPremio;
