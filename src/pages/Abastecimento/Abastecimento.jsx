import React, { useEffect, useState } from 'react'

import { FaGasPump } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { RiTruckLine } from "react-icons/ri";
import { FaRegBuilding } from "react-icons/fa";
import { PiRanking } from "react-icons/pi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { GiTargetPrize } from "react-icons/gi";


import { Route, Routes, NavLink } from 'react-router-dom';
import AbastecimentoGeral from './AbastecimentoGeral';
import AbastecimentoVeiculos from './AbastecimentoVeiculos';
import AbastecimentoColetaEntrega from './AbastecimentoColetaEntrega';
import AbastecimentoMediaFilial from './AbastecimentoMediaFilial';
import Filter from '../../Components/Filtro/Filter';
import FilterVault from '../../Context/FilterVault';
import AbastecimentoRanking from './AbastecimentoRanking';
import AbastecimentoPremio from './AbastecimentoPremio';

function Abastecimento() {

    const [iconSize, setIconSize] = useState(20);

    // Effect responsavel pelo tamanho do icon.
    useEffect(() => {

        function resizeIcon() {
            if (window.matchMedia('(max-width: 700px)').matches) {
                setIconSize(15);
            } else {
                setIconSize(20);
            }
        }

        window.addEventListener('resize', resizeIcon);

        return () => {
            window.removeEventListener('resize', resizeIcon);
        }

    }, []);


    return (
        <>
            <section className='container animeLeft'>

                <nav className='navigation'>
                    <h1 className='title'>Abastecimento <FaGasPump size={iconSize} fill='#1e3a8a' /></h1>

                    <ul >
                        <li>
                            <NavLink to='' end>Visão Geral <GoGraph /> </NavLink>
                        </li>
                        <li>
                            <NavLink to='ranking'>Ranking <PiRanking /> </NavLink>
                        </li>
                        <li>
                            <NavLink to='premio'>Prêmio <GiTargetPrize /> </NavLink>
                        </li>
                        <li>
                            <NavLink to='coleta'>Coleta - Entrega <MdOutlineWaterDrop /> </NavLink>
                        </li>
                        <li>
                            <NavLink to='media'>Tráfego <FaRegBuilding /> </NavLink>
                        </li>
                        <li>
                            <NavLink to='veiculos'>Veículos <RiTruckLine /> </NavLink>
                        </li>
                    </ul>
                    <a href="https://carvalima.unitopconsultoria.com.br/integracao" target='_blank' className='linkExterno'>UNITOP X ATS</a>
                </nav>

                <FilterVault>
                    <Routes>
                        <Route path='/' element={<AbastecimentoGeral />} />
                        <Route path='veiculos' element={<AbastecimentoVeiculos />} />
                        <Route path='ranking' element={<AbastecimentoRanking />} />
                        <Route path='premio/*' element={<AbastecimentoPremio />} />
                        <Route path='coleta' element={<AbastecimentoColetaEntrega />} />
                        <Route path='media' element={<AbastecimentoMediaFilial />} />
                    </Routes>

                    <Filter />

                </FilterVault>



            </section>


        </>
    )
}

export default Abastecimento;