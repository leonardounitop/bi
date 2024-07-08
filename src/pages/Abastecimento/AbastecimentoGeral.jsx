import React, { useContext, useEffect, useState } from 'react'
import { FaRoad } from "react-icons/fa";
import { MdOutlineOilBarrel } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { TbDropletDollar } from "react-icons/tb";

import styles from './Abastecimento.module.css';
import Pie from '../../Graph/Pie';
import Bar from '../../Graph/Bar';

import { currency, decimalFormatter } from '../../Helper/NumberFormatter';
import BarContentLoader from '../../Helper/Skeleton/BarContentLoader';
import PieContentLoader from '../../Helper/Skeleton/PieContentLoader';

import LoadingSpinner from '../../Helper/LoadingSpinner';
import { FilterContext } from '../../Context/FilterVault';
import Line from '../../Graph/Line';

const transformData = (data) => {
    const groupedData = {};

    data.forEach(item => {
        const { equipamento, media, mes } = item;

        if (!groupedData[equipamento]) {
            groupedData[equipamento] = [];
        }

        groupedData[equipamento].push({ x: mes, y: isNaN(parseFloat(media)) ? null : parseFloat(media) });
    });

    return Object.keys(groupedData).map(equipamento => ({
        id: equipamento,
        data: groupedData[equipamento]
    }));
};


function AbastecimentoGeral() {

    const [cardInfo, setCardInfo] = useState(null);
    const [consumoFilial, setConsumoFilial] = useState(null);
    const [valorCategoria, setValorCategoria] = useState(null);
    const [consumoTipo, setConsumoTipo] = useState(null);
    const [consumoMensal, setConsumoMensal] = useState(null);
    const [modelo, setModelo] = useState(null);
    const [lineFilialData, setLineFilialData] = useState(null);

    const dadosFiltro = useContext(FilterContext);
    const { url, fetchData, filterFetchs } = dadosFiltro;


    // Fetch inicial de todos os dados com os filtros.
    useEffect(() => {

        if (url) {
            async function fetchDados() {
                try {

                    const [
                        jsonCards,
                        jsonConsumoMensal,
                        jsonValorCategoria,
                        jsonConsumoPorTipo,
                        jsonConsumoFilial,
                        jsonModeloVeiculo,
                        jsonConsumoMedioFilial
                    ] = await Promise.all([
                        fetchData('cards', filterFetchs),
                        fetchData('consumoMensal', filterFetchs),
                        fetchData('valorCategoria', filterFetchs),
                        fetchData('consumoPorTipo', filterFetchs),
                        fetchData('consumoFilial', filterFetchs),
                        fetchData('modeloVeiculo', filterFetchs),
                        fetchData('obterMediaMensalFiliais', filterFetchs)
                    ])


                    const lineData = transformData(jsonConsumoMedioFilial);

                    console.log(lineData);


                    if (jsonCards)
                        setCardInfo(jsonCards);
                    if (jsonConsumoMensal)
                        setConsumoMensal(jsonConsumoMensal);
                    if (jsonValorCategoria)
                        setValorCategoria(jsonValorCategoria);
                    if (jsonConsumoPorTipo)
                        setConsumoTipo(jsonConsumoPorTipo);
                    if (jsonConsumoFilial)
                        setConsumoFilial(jsonConsumoFilial);
                    if (jsonModeloVeiculo)
                        setModelo(jsonModeloVeiculo);

                    if (lineData)
                        setLineFilialData(lineData);


                } catch (error) {
                    console.log(error);
                }
            }

            fetchDados();
        }

    }, [dadosFiltro])


    return (
        <>
            <section className='animeLeft'>

                <div className="container-cards">
                    <div className="card">
                        <h2>Volume <MdOutlineOilBarrel /></h2>
                        <span className="card-value">
                            {cardInfo ? decimalFormatter.format(cardInfo.volume) : <LoadingSpinner />}
                        </span>
                    </div>
                    <div className="card">
                        <h2>KM Perc. <FaRoad /></h2>
                        <span className="card-value">
                            {cardInfo ? decimalFormatter.format(cardInfo.km_perc) : <LoadingSpinner />}

                        </span>
                    </div>
                    <div className="card">
                        <h2>Média km/l <BsSpeedometer /></h2>
                        <span className="card-value">
                            {cardInfo ? decimalFormatter.format(cardInfo.media) : <LoadingSpinner />}

                        </span>
                    </div>
                    <div className="card">
                        <h2>Total Pago <GiPayMoney /></h2>
                        <span className="card-value">
                            {cardInfo ? currency.format(cardInfo.total_pago) : <LoadingSpinner />}
                        </span>
                    </div>
                    <div className="card">
                        <h2>Média R$ litro <TbDropletDollar /></h2>
                        <span className="card-value">
                            {cardInfo ? currency.format(cardInfo.media_valor) : <LoadingSpinner />}
                        </span>
                    </div>
                </div>

                <div className={styles.containerTripleChart}>
                    <div className={styles.graphBox}>
                        {consumoMensal ? <Bar
                            data={consumoMensal}
                            dataType='volume'
                            keys={['media_mensal']}
                            indexBy="mes"
                            margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
                        /> : <BarContentLoader />}
                    </div>
                    <div className={styles.graphBox}>
                        {valorCategoria ? <Bar
                            data={valorCategoria}
                            layout='horizontal'
                            dataType='currency'
                            keys={['valor']}
                            indexBy="categoria"
                            margin={{ top: 10, right: 10, bottom: 0, left: 220 }}
                        /> : <BarContentLoader />}
                    </div>
                    <div className={styles.graphBox}>
                        {consumoTipo ? <Bar
                            data={consumoTipo}
                            layout='horizontal'
                            dataType='volume'
                            keys={['media']}
                            indexBy="descricao"
                            margin={{ top: 10, right: 10, bottom: 0, left: 100 }}
                        /> : <BarContentLoader />}
                    </div>
                </div>

                <div className={styles.doubleChart}>

                    <div className={styles.graphBoxGrid}>
                        {lineFilialData ?
                            <Line
                                data={lineFilialData}
                                legend='Consumo médio mensal por Categoria'
                                dataType='volume'
                            /> : <BarContentLoader />}
                    </div>

                    <div className={styles.graphBoxGrid}>
                        {consumoFilial ?
                            <Pie
                                data={consumoFilial}
                                padAngle={0}
                                innerRadius={consumoFilial.length > 2 ? 0 : 0.5}
                                dataType='volume'
                            />
                            :
                            <PieContentLoader />}
                    </div>
                    <div className={styles.graphBoxGrid}>
                        {modelo ? <Pie
                            data={modelo}
                            padAngle={15}
                            innerRadius={0.1}
                            dataType='currency'
                        /> : <PieContentLoader />}
                    </div>

                </div>
            </section>
        </>
    )
}

export default AbastecimentoGeral