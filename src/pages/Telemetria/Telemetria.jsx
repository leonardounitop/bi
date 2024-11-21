import React from 'react';
import TelemetriaGeral from './TelemetriaGeral';
import { Routes, Route, NavLink } from 'react-router-dom';
import FilterTelemetria from '../../Components/Filtro/FilterTelemetria';
import FilterTelemetriaProvider from '../../Context/FilterTelemetriaProvider';

import { GoGraph } from 'react-icons/go';
import { PiSecurityCamera } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoIosGitCompare } from "react-icons/io";
import TelemetriaInfracoes from './TelemetriaInfracoes';
import TelemetriaMultas from './TelemetriaMultas';

import TelemetriaComparativo from './TelemetriaComparativo';
import FilterMultasProvider from '../../Context/FilterMultasProvider';
import FilterInfracoesProvider from '../../Context/FilterInfracoesProvider';


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
                    <Route path='infracoes' element={<FilterInfracoesProvider><TelemetriaInfracoes /></FilterInfracoesProvider>} />
                    <Route path='comparativo' element={<TelemetriaComparativo />} />
                    <Route path='multas' element={<FilterMultasProvider><TelemetriaMultas /></FilterMultasProvider>} />
                </Routes>
                <FilterTelemetria />

            </FilterTelemetriaProvider>




        </section>
    )
}

export default Telemetria
