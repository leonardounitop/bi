import React, { useContext, useEffect, useState } from 'react'
import TableContentLoader from '../../Helper/Skeleton/TableContentLoader';
import { MdOutlineOilBarrel } from "react-icons/md";

import { FilterContext } from '../../Context/FilterVault'

import { FaRoad } from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";
import LoadingSpinner from '../../Helper/LoadingSpinner'
import { decimalFormatter } from '../../Helper/NumberFormatter';
import styles from './Abastecimento.module.css'

import Table from '../../Components/Table/Table';




function getMonthName(monthNumber) {
    const date = new Date(2000, monthNumber, 1);
    date.setMonth(monthNumber); // Ajusta o mês, pois os meses são baseados em zero (0 = Janeiro, 11 = Dezembro)
    return date.toLocaleString('pt-BR', { month: 'long' });
}

function AbastecimentoColetaEntrega() {

    const [columns, setColumns] = useState(null);
    const [data, setData] = useState(null);
    const [dataCards, setDataCards] = useState(null);

    const { url, fetchData } = useContext(FilterContext);

    // Cards coleta
    useEffect(() => {

        if (url) {
            (async () => {

                try {

                    const json = await fetchData('obterDadosCardsColeta');
                    setDataCards(json[0]);


                } catch (error) {
                    console.log(error);
                }

            })()

        }

    }, [url])

    useEffect(() => {
        if (url) {
            (async () => {

                const json = await fetchData('obterColeta');

                const createDataColumns = [
                    {
                        field: 'filial',
                        headerName: 'Filial',
                        type: 'text'
                    },
                    {
                        field: 'meta',
                        headerName: 'Meta',
                        type: 'number',
                    },
                    {
                        field: 'acumulado',
                        headerName: 'Acumulado',
                        type: 'number',
                    },
                    {
                        field: 'atingimentometa',
                        headerName: '% Atingimento Meta',
                        width: 150,
                        type: 'number',
                        renderCell: ({ row }) => {

                            const value = +row.atingimentometa;

                            let bgColor = null;
                            let textColor = null;

                            if (value >= 98) {
                                bgColor = '#15803d';
                                textColor = '#f0fdf4';
                            } else if (value >= 94) {
                                bgColor = '#facc15';
                                textColor = '#713f12';
                            } else {
                                bgColor = '#b91c1c';
                                textColor = '#fef2f2';
                            }

                            return <div>
                                <span className={styles.atingimentoMeta} style={{ backgroundColor: bgColor, color: textColor }}>
                                    {`${value}%`}
                                </span>
                            </div>
                        },
                    },
                ];

                const numeroMes = new Date().getMonth();

                for (let i = 0; i <= numeroMes; i++) {
                    createDataColumns.push({
                        field: getMonthName(i),
                        type: 'number'
                    })
                }

                setColumns(createDataColumns);
                setData(json);

            })()
        }
    }, [url])


    return (
        <section className='animeLeft'>



            <div className={styles.containerList}>

                <div className="container-cards" style={{ marginBottom: 20 }}>
                    <div className="card">
                        <h2>Litragem <MdOutlineOilBarrel /></h2>
                        <span className="card-value">
                            {dataCards ? decimalFormatter.format(dataCards.volume) : <LoadingSpinner />}
                        </span>
                    </div>
                    <div className="card">
                        <h2>KM Perc. <FaRoad /></h2>
                        <span className="card-value">
                            {dataCards ? decimalFormatter.format(dataCards.km_percorrido) : <LoadingSpinner />}
                        </span>
                    </div>
                    <div className="card">
                        <h2>Média Geral <BsSpeedometer /></h2>
                        <span className="card-value">
                            {dataCards ? decimalFormatter.format(dataCards.media) : <LoadingSpinner />}
                        </span>
                    </div>
                </div>

                <p className={styles.listTitle}>Índices</p>
                <ul className={styles.listaIndice}>
                    <li className={styles.listIndiceGreen}>
                        Entre 98 A 100%
                    </li>

                    <li className={styles.listIndiceYellow}>
                        Entre 94 A 98%
                    </li>

                    <li className={styles.listIndiceRed}>
                        {`< 94%`}
                    </li>
                </ul>

            </div>

            <div className={styles.subtitleContainer}>
                <h2 className={styles.subtitle}>Consumo Combustivel Km/L Filiais - Coleta | Entrega</h2>
            </div>
            <div className={`${styles.containerGrid} `} style={{ height: '70vh' }} >
                {columns && data ?
                    <Table rows={data}
                        columns={columns}
                        hideFooter={true}
                    />
                    : <TableContentLoader />}
            </div>



        </section>
    )
}

export default AbastecimentoColetaEntrega