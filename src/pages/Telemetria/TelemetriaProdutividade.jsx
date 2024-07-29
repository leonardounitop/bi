import React, { useContext, useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';

import styles from './TelemetriaProdutividade.module.css';
import { FilterContext } from '../../Context/FilterVault';
import { IoMdStopwatch } from "react-icons/io";
import Line from '../../Graph/Line';



function TelemetriaProdutividade() {

    const [prodMensal, setProdMensal] = useState(null);
    const { fetchData, url } = useContext(FilterContext);


    // useEffect(() => {
    //     if (url)

    //         try {
    //             (async () => {
    //                 const jsonProdutividadeGeral = await fetchData('obterDadosProdutividade');
    //                 const jsonProdutividadeMensal = await fetchData('obterProdutividadeMensal');

    //                 if (jsonProdutividadeGeral)
    //                     setPercent(jsonProdutividadeGeral.produtividade);
    //                 if (jsonProdutividadeMensal)
    //                     setProdMensal(jsonProdutividadeMensal);
    //             })();

    //         } catch (error) {
    //             console.log(error);
    //         }


    // }, [url])



    return (
        <section className='animeLeft'>

            <div className={styles.container}>



                <div className={styles.paradoLigado}>
                    <h2>Custo Parado Ligado <IoMdStopwatch /></h2>
                    <ul className={styles.containerParadoLigado}>
                        <li className={styles.cardParadoLigado}>
                            <h3>Acumulado Periodo</h3>
                            <span>R$ 0,00</span>
                        </li>
                        <li className={styles.cardParadoLigado}>
                            <h3>Média Mensal</h3>
                            <span>R$ 0,00</span>
                        </li>
                        <li className={styles.cardParadoLigado}>
                            <h3>Acumulado Veículo</h3>
                            <span>R$ 0,00</span>
                        </li>
                        <li className={styles.cardParadoLigado}>
                            <h3>Acumulado Periodo</h3>
                            <span>R$ 0,00</span>
                        </li>
                    </ul>
                </div>




            </div>
            <div style={{ height: 500 }}>
                {prodMensal ? <Line data={prodMensal} dataType='percent' /> : 'Loading'}
            </div>

        </section>
    )
}

export default TelemetriaProdutividade