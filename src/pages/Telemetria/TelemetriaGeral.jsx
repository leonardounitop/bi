import React, { useState, useEffect, useContext } from 'react';
import styles from './TelemetriaGeral.module.css';
import Bar from '../../Graph/Bar';
import Pie from '../../Graph/Pie'
import BarContentLoader from '../../Helper/Skeleton/BarContentLoader'
import PieContentLoader from '../../Helper/Skeleton/PieContentLoader'
import GaugeComponent from 'react-gauge-component';


import { PiEngineBold } from "react-icons/pi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiAlertTriangle } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { FaRegClock } from "react-icons/fa6";

import LoadingSpinner from '../../Helper/LoadingSpinner'
import { FilterContext } from '../../Context/FilterVault';
import Line from '../../Graph/Line';

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
    const [totalInfracoes, setTotalInfracoes] = useState(null);
    const [consumoMensalMarca, setConsumoMensalMarca] = useState(null);

    const [percent, setPercent] = useState(0); // Exemplo de valor de porcentagem (entre 0 e 1)

    const transformData = (data) => {
        const groupedData = {};

        data.forEach(item => {
            const { id, value, mes } = item;

            if (!groupedData[id]) {
                groupedData[id] = [];
            }

            groupedData[id].push({ x: mes, y: isNaN(parseFloat(value)) ? null : parseFloat(value) });
        });

        return Object.keys(groupedData).map(id => ({
            id: id,
            data: groupedData[id]
        }));
    };

    const dadosFilter = useContext(FilterContext);
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
                        jsonProdutividadeGeral,
                        jsonTotalInfracoes,
                        jsonConsumoMedioMensal
                    ] = await Promise.all([
                        fetchData('obterDadosCards', filterFetchs),
                        fetchData('obterPercentualMensal', filterFetchs),
                        fetchData('obterDadosMarca', filterFetchs),
                        fetchData('obterDadosConsumoMarca', filterFetchs),
                        fetchData('obterDadosProdutividade', filterFetchs),
                        fetchData('obterTotalInfracoes', filterFetchs),
                        fetchData('obterConsumoMedioMensal', filterFetchs),
                    ]);



                    if (jsonCards)
                        setDadosCards(jsonCards);
                    if (jsonPercentualMensal)
                        setPercMensal(jsonPercentualMensal);
                    if (jsonDadosMarca)
                        setPercMarcas(jsonDadosMarca);
                    if (jsonDadosConsumoMarca)
                        setConsumoMarcas(jsonDadosConsumoMarca);
                    if (jsonProdutividadeGeral)
                        setPercent(jsonProdutividadeGeral.produtividade);
                    if (jsonTotalInfracoes)
                        setTotalInfracoes(jsonTotalInfracoes);
                    if (jsonConsumoMedioMensal) {
                        const consumoMensalTransformado = transformData(jsonConsumoMedioMensal);
                        setConsumoMensalMarca(consumoMensalTransformado);
                    }


                })();

            } catch (error) {
                console.log(error);
            }


    }, [dadosFilter])


    return (
        <section className=' animeLeft'>

            <div className={styles.containerFaixas}>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}
                        style={{ color: dadosCards && dadosCards.per_verde ? dadosCards.per_verde >= 50 ? '#166534' : '#b91c1c' : '#333' }}>
                        {dadosCards ? `${dadosCards.per_verde}%` : <LoadingSpinner width={24} height={24} />}
                    </div>
                    <div className={styles.cardTime}
                        style={{ background: backgroundColor.verde }}   >
                        <span>{dadosCards ? dadosCards.faixa_verde : '00:00:00'}</span><PiEngineBold />
                    </div>
                </div>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}
                        style={{ color: dadosCards && dadosCards.per_amarela ? dadosCards.per_amarela < 20 ? '#166534' : '#b91c1c' : '#333' }} >
                        {dadosCards ? `${dadosCards.per_amarela}%` : <LoadingSpinner width={24} height={24} />}
                    </div>
                    <div className={styles.cardTime}
                        style={{ background: backgroundColor.amarelo }}   >
                        <span>{dadosCards ? dadosCards.faixa_amarela : '00:00:00'}</span> <AiOutlineThunderbolt />

                    </div>
                </div>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}
                        style={{ color: dadosCards && dadosCards.per_vermelha ? dadosCards.per_vermelha < 1 ? '#166534' : '#b91c1c' : '#333' }} >
                        {dadosCards ? `${dadosCards.per_vermelha}%` : <LoadingSpinner width={24} height={24} />}

                    </div>
                    <div className={styles.cardTime}
                        style={{ background: backgroundColor.vermelho }}>
                        <span>{dadosCards ? dadosCards.faixa_vermelha : '00:00:00'}</span> <FiAlertTriangle />

                    </div>
                </div>
                <div className={styles.containerCard}>
                    <div className={styles.cardPerc}
                        style={{ color: dadosCards && dadosCards.per_azul ? dadosCards.per_azul < 10 ? '#166534' : '#b91c1c' : '#333' }}>
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

                <div className={styles.containerGauge}>
                    <GaugeComponent
                        value={percent}
                        type="semicircle"
                        labels={{
                            tickLabels: {
                                type: "inner",
                                ticks: [
                                    { value: 20 },
                                    { value: 40 },
                                    { value: 60 },
                                    { value: 80 },
                                    { value: 100 }
                                ]
                            },
                            valueLabel: {
                                // matchColorWithArc: true,
                                style: { fontSize: "40px", fill: "#555" }
                            }
                        }}
                        arc={{
                            gradient: true,
                            colorArray: ['#EA4228', '#EA4228', '#fde047', '#fde047', '#16a34a'],
                            subArcs: [{ limit: 20 }, { limit: 45 }, { limit: 55 }, { limit: 78 }, {}],
                            padding: 0.01,
                            width: 0.1,
                        }}
                        pointer={{
                            color: '#ddd',
                            width: 15,
                            type: 'arrow',
                        }}

                        maxValue={100}
                        minValue={0}
                    />
                </div>

                <div className={styles.box}  >

                    {percMensal ? <Bar
                        data={percMensal}
                        keys={[
                            'Faixa Econômica',
                            'Faixa Potência',
                            'Marcha Lenta',
                            'Alta Rotação',
                        ]}
                        groupMode="grouped"
                        layout="vertical"
                        indexBy="mes"
                        dataType='percent'
                        telemetria={true}
                        margin={{ bottom: 25, left: 65, right: 20, top: 10 }}

                    /> : <BarContentLoader />}

                </div>

                <div className={styles.box}>

                    {percMarcas ? <Bar
                        data={percMarcas}
                        keys={[
                            'Faixa Econômica',
                            'Faixa Potência',
                            'Marcha Lenta',
                            'Alta Rotação',
                        ]}
                        groupMode="grouped"
                        layout="horizontal"
                        indexBy="Marca"
                        dataType='percent'
                        telemetria={true}
                        margin={{ bottom: 25, left: 65, right: 20, top: 10 }}

                    /> : <BarContentLoader />}



                </div>





            </div>
            <div className={styles.doubleContainer}>


                <div className={styles.box}>

                    {percMarcas ? <Line
                        data={consumoMensalMarca}
                        dataType='volume'
                    /> : <BarContentLoader />}



                </div>


                <div className={styles.box} >
                    {consumoMarcas ? <Pie
                        data={consumoMarcas}
                        dataType='volume'
                    /> : <PieContentLoader />}

                </div>


                <div className={styles.box} >
                    {totalInfracoes ? <Pie
                        data={totalInfracoes}
                        padAngle={15}
                    /> : <PieContentLoader />}

                </div>

            </div>



        </section>
    )
}

export default TelemetriaGeral