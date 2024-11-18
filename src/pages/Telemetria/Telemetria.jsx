import React from 'react';
import TelemetriaGeral from './TelemetriaGeral';
import { Routes, Route, NavLink } from 'react-router-dom';
import FilterTelemetria from '../../Components/Filtro/FilterTelemetria';
import FilterTelemetriaProvider from '../../Context/FilterTelemetriaProvider';

import { GoGraph } from 'react-icons/go';
import { MdOutlinePercent } from "react-icons/md";
import { PiRanking, PiSecurityCamera } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";



import { IoIosGitCompare } from "react-icons/io";
import TelemetriaInfracoes from './TelemetriaInfracoes';
import TelemetriaMultas from './TelemetriaMultas';
// import TelemetriaRanking from './TelemetriaRanking';
import TelemetriaComparativo from './TelemetriaComparativo';



function Telemetria() {



    return (
        <section className='container animeLeft'>
            <nav className='navigation'>
                <h1 className='title'>Telemetria  <BsGraphUpArrow size={20} />  </h1>
                <ul >
                    <li>
                        <NavLink to='' end>Visão Geral <GoGraph /> </NavLink>
                    </li>
                    <li>
                        <NavLink to='infracoes'>Infrações <IoWarningOutline /> </NavLink>
                    </li>
                    <li>
                        <NavLink to='comparativo'>Comparativo <IoIosGitCompare /> </NavLink>
                    </li>
                    <li>
                        <NavLink to='multas'>Multas <PiSecurityCamera /> </NavLink>
                    </li>
                </ul>
            </nav>

            <FilterTelemetriaProvider>
                <Routes>
                    <Route path='' element={<TelemetriaGeral />} end />
                    <Route path='infracoes' element={<TelemetriaInfracoes />} />
                    <Route path='comparativo' element={<TelemetriaComparativo />} />
                    <Route path='multas' element={<TelemetriaMultas />} />
                </Routes>
                <FilterTelemetria />
            </FilterTelemetriaProvider>




        </section>
    )
}

export default Telemetria
