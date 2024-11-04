import React, { useContext, useEffect, useState } from 'react'
import Table from '../../Components/Table/Table';
import styles from './Abastecimento.module.css';
import TableContentLoader from '../../Helper/Skeleton/TableContentLoader';

import { FaRoad } from "react-icons/fa";
import { MdOutlineOilBarrel } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";
import LoadingSpinner from '../../Helper/LoadingSpinner'
import { FilterContext } from '../../Context/FilterVault';

import { decimalFormatter } from '../../Helper/NumberFormatter';




function getMonthName(monthNumber) {
    const date = new Date(2000, monthNumber, 1);
    date.setMonth(monthNumber); // Ajusta o mês, pois os meses são baseados em zero (0 = Janeiro, 11 = Dezembro)
    return date.toLocaleString('pt-BR', { month: 'long' });
}



function AbastecimentoMediaFilial() {


    const [columns, setColumns] = useState(null);
    const [dataMatriz, setDataMatriz] = useState(null);
    const [dataCGR, setDataCGR] = useState(null);
    const [dataCards, setDataCards] = useState(null);

    const { url, fetchData } = useContext(FilterContext);


    // cards filiais
    useEffect(() => {

        if (url)
            (async () => {
                try {
                    const json = await fetchData('obterDadosFiliais');
                    setDataCards(json[0]);

                } catch (error) {
                    console.log(error);
                }

            })()

    }, [url])


    // Popular tabelas
    useEffect(() => {

        if (url)
            (async () => {
                try {
                    const [jsonMatriz, jsonCGR] = await Promise.all([fetchData('obterComparativoMatriz'), fetchData('obterComparativoCGR')]);

                    const createDataColumns = [
                        {
                            field: 'modelo',
                            headerName: 'Modelo',
                            type: 'text',
                            width: 250
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
                        });
                    }

                    setColumns(createDataColumns);
                    setDataMatriz(jsonMatriz);
                    setDataCGR(jsonCGR);

                } catch (error) {
                    console.log(error);
                }

            })()
    }, [url])



    return (
        <section className='animeLeft'>

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

            <h2 className={styles.subtitle}>Média Diesel - Tráfego - {'Matriz'}</h2>

            <div className={styles.containerGrid} >
                {dataMatriz ?
                    <Table
                        rows={dataMatriz}
                        columns={columns}
                        hideFooter={true}
                        autoHeight={true}
                    />

                    : <div style={{ height: 400 }}> <TableContentLoader /> </div>}
            </div>
            <h2 className={styles.subtitle} style={{ marginTop: '1rem' }} >Média Diesel - Tráfego - {'CGR'}</h2>
            <div className={styles.containerGrid}  >
                {dataCGR ?
                    <Table
                        rows={dataCGR}
                        columns={columns}
                        hideFooter={true}
                        autoHeight={true}
                    />
                    : <div style={{ height: 400 }}> <TableContentLoader /> </div>}
            </div>


        </section>
    )
}

export default AbastecimentoMediaFilial