import React, { useState, useEffect, useContext } from 'react';
import styles from './TelemetriaGeral.module.css';
import Bar from '../../Graph/Bar';
import Pie from '../../Graph/Pie'
import BarContentLoader from '../../Helper/Skeleton/BarContentLoader'
import PieContentLoader from '../../Helper/Skeleton/PieContentLoader'

import { PiEngineBold } from "react-icons/pi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { FaRegClock } from "react-icons/fa6";

import LoadingSpinner from '../../Helper/LoadingSpinner'
import { FilterContext } from '../../Context/FilterVault';

const backgroundColor = {
    verde: 'linear-gradient(to right, #34d399, #064e3b)',
    azul: 'linear-gradient(to right, #38bdf8, #075985)',
    amarelo: 'linear-gradient(to right, #facc15, #854d0e)',
    vermelho: 'linear-gradient(to right, #f87171, #991b1b)',
    cinza: 'linear-gradient(to right, #a8a29e, #292524)',
}

function TelemetriaGeral() {

    const [dadosCards, setDadosCards] = useState(null);
    const [percMensal, setPercMensal] = useState(null);
    const [percMarcas, setPercMarcas] = useState(null);
    const [consumoMarcas, setConsumoMarcas] = useState(null);


    const dadosFilter = useContext(FilterContext)
    const { fetchData, filterFetchs, url } = dadosFilter;

    // Fetch dos graficos 
    useEffect(() => {
        if (url)
            try {
                (async () => {
                    const [
                        jsonCards,
                        jsonPercentualMensal,
                        jsonDadosMarca,
                        jsonDadosConsumoMarca,
                    ] = await Promise.all([
                        fetchData('obterDadosCards', filterFetchs),
                        fetchData('obterPercentualMensal', filterFetchs),
                        fetchData('obterDadosMarca', filterFetchs),
                        fetchData('obterDadosConsumoMarca', filterFetchs),
                    ]);



                    if (jsonCards)
                        setDadosCards(jsonCards);
                    if (jsonPercentualMensal)
                        setPercMensal(jsonPercentualMensal);
                    if (jsonDadosMarca)
                        setPercMarcas(jsonDadosMarca);
                    if (jsonDadosConsumoMarca)
                        setConsumoMarcas(jsonDadosConsumoMarca);
                })();

            } catch (error) {
                console.log(error);
            }


    }, [dadosFilter])


    return (
        <section className=' animeLeft'>

            <div className={styles.containerFaixas}>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}>
                        {dadosCards ? `${dadosCards.per_verde}%` : <LoadingSpinner width={24} height={24} />}
                    </div>
                    <div className={styles.cardTime} style={{ background: backgroundColor.verde }}>
                        <span>{dadosCards ? dadosCards.faixa_verde : '00:00:00'}</span><PiEngineBold />
                    </div>
                </div>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}>
                        {dadosCards ? `${dadosCards.per_amarela}%` : <LoadingSpinner width={24} height={24} />}
                    </div>
                    <div className={styles.cardTime} style={{ background: backgroundColor.amarelo }}>
                        <span>{dadosCards ? dadosCards.faixa_amarela : '00:00:00'}</span> <AiOutlineThunderbolt />

                    </div>
                </div>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}>
                        {dadosCards ? `${dadosCards.per_vermelha}%` : <LoadingSpinner width={24} height={24} />}

                    </div>
                    <div className={styles.cardTime} style={{ background: backgroundColor.vermelho }}>
                        <span>{dadosCards ? dadosCards.faixa_vermelha : '00:00:00'}</span> <FiAlertTriangle />

                    </div>
                </div>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}>
                        {dadosCards ? `${dadosCards.per_azul}%` : <LoadingSpinner width={24} height={24} />}

                    </div>
                    <div className={styles.cardTime} style={{ background: backgroundColor.azul }}>
                        <span>{dadosCards ? dadosCards.faixa_azul : '00:00:00'}</span> <GoGear />

                    </div>
                </div>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}>
                        {dadosCards ? `${dadosCards.per_azul}%` : <LoadingSpinner width={24} height={24} />}
                    </div>
                    <div className={styles.cardTime} style={{ background: backgroundColor.cinza }}>
                        <span>{dadosCards ? dadosCards.faixa_azul : '00:00:00'}</span> <FaRegClock />

                    </div>
                </div>
            </div>

            <div className={styles.containerBar}>

                <div className={styles.box}  >
                    {percMensal ? <Bar
                        data={percMensal}
                        keys={[
                            'Faixa Econômica',
                            'Faixa Potência',
                            'Marcha Lenta',
                            'Alta Rotação',
                        ]}
                        indexBy="mes"
                        groupMode="grouped"
                        telemetria={true}
                        dataType='percent'
                        margin={{ bottom: 25, left: 30 }}

                    /> : <BarContentLoader />}

                </div>



            </div>
            <div className={styles.doubleContainer}>

                <div className={styles.box}>

                    {percMarcas ? <Bar
                        data={percMarcas}
                        keys={[
                            'Faixa Econômica',
                            'Faixa Potência',
                            'Marcha Lenta',
                            'Alta Rotação',
                        ]}
                        groupMode="stacked"
                        layout="horizontal"
                        indexBy="Marca"
                        dataType='percent'
                        telemetria={true}
                        margin={{ bottom: 25, left: 65, right: 20, top: 10 }}

                    /> : <BarContentLoader />}



                </div>

                <div className={styles.box} >
                    {consumoMarcas ? <Pie
                        data={consumoMarcas}
                        dataType='volume'
                    /> : <PieContentLoader />}

                </div>

            </div>



        </section>
    )
}

export default TelemetriaGeral