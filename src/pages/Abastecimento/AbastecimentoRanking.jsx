import React, { useContext, useEffect, useState } from 'react'
import { FilterContext } from '../../Context/FilterVault';
import Bar from '../../Graph/Bar';
import BarContentLoader from '../../Helper/Skeleton/BarContentLoader';
import styles from './AbastecimentoRanking.module.css';


import { FiAlertCircle } from "react-icons/fi";

import { GiChampions } from "react-icons/gi";


function AbastecimentoRanking() {

    const [listMelhores, setListMelhores] = useState(null);
    const [listPiores, setListPiores] = useState(null);



    const dadosFiltro = useContext(FilterContext);
    const { url, fetchData, filterFetchs } = dadosFiltro;


    useEffect(() => {

        async function fetchRankingMotoristas() {

            try {
                const json = await fetchData('obterRankingMotoristas', filterFetchs);

                if ('melhores' in json && 'piores' in json) {
                    setListMelhores(json.melhores);
                    setListPiores(json.piores);
                }

            } catch (e) {
                console.error(e);
            } finally {

            }

        }

        if (url) {
            fetchRankingMotoristas();
        }


    }, [url, filterFetchs]);


    return (
        <section className='animeLeft'>
            <div className={styles.containerCards}>

                <div className={styles.boxCard}>
                    <h2 className={styles.subTitle}>Melhores <GiChampions /></h2>

                    <div className={styles.card}>
                        {listMelhores ? <Bar
                            data={listMelhores}
                            dataType='volume'
                            keys={['media']}
                            indexBy="placa"
                            layout='horizontal'
                            margin={{ top: 10, right: 10, bottom: 30, left: 80 }}
                        /> : <BarContentLoader />}
                    </div>
                </div>

                <div className={styles.boxCard}>
                    <h2 className={styles.subTitle}>Piores <FiAlertCircle /></h2>

                    <div className={styles.card}>
                        {listPiores ? <Bar
                            data={listPiores}
                            dataType='volume'
                            keys={['media']}
                            indexBy="placa"
                            layout='horizontal'
                            margin={{ top: 10, right: 10, bottom: 30, left: 80 }}
                        /> : <BarContentLoader />}
                    </div>
                </div>
            </div>

        </section>
    )
}

export default AbastecimentoRanking