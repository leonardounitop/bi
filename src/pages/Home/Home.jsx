import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    return (
        <>

            <section className=' container animeLeft'>

                <div className="container-cards bg-gradiente">
                    <h1 className="gradiente-text">
                        UNITOP - Business Intelligence
                    </h1>
                </div>


                <nav className="nav">
                    <NavLink target='_blank' to='abastecimento'>Abastecimento</NavLink>

                </nav>

                <div className="cardHome">
                    aaasas

                </div>



            </section>

        </>

    )
}

export default Home