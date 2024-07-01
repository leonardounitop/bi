import React from 'react';
import TelemetriaGeral from './TelemetriaGeral';
import { Routes, Route, NavLink } from 'react-router-dom';
import Filter from '../../Components/Filtro/Filter';
import FilterVault from '../../Context/FilterVault';
import TelemetriaProdutividade from './TelemetriaProdutividade';

import { GoGraph } from 'react-icons/go';
import { MdOutlinePercent } from "react-icons/md";
import { PiRanking } from "react-icons/pi";
import { IoIosGitCompare } from "react-icons/io";


function Telemetria() {
    return (
        <section className='container animeLeft'>
            <nav className='navigation'>
                <h1 className='title'>Telemetria    </h1>

                <ul >
                    <li>
                        <NavLink to='' end>Visão Geral <GoGraph /> </NavLink>
                    </li>
                    <li>
                        <NavLink to='produtividade'>Produtividade <MdOutlinePercent /> </NavLink>
                    </li>
                    <li>
                        <NavLink to='ranking'>Ranking <PiRanking /> </NavLink>
                    </li>
                    <li>
                        <NavLink to='comparativo'>Comparativo <IoIosGitCompare /> </NavLink>
                    </li>
                </ul>
            </nav>

            <FilterVault>


                <Routes>
                    <Route path='' element={<TelemetriaGeral />} end />
                    <Route path='produtividade' element={<TelemetriaProdutividade />} />
                </Routes>


                <Filter />
            </FilterVault>




        </section>
    )
}

export default Telemetria
