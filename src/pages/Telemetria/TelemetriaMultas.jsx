import React, { useContext, useEffect, useState } from 'react'
import { FilterTelemetriaContext } from '../../Context/FilterTelemetriaProvider';
import { TbReportMoney } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import LoadingSpinner from '../../Helper/LoadingSpinner';



import styles from './TelemetriaMultas.module.css';
import { currency } from '../../Helper/NumberFormatter';
import Bar from '../../Graph/Bar';
import Pie from '../../Graph/Pie';
import BarContentLoader from '../../Helper/Skeleton/BarContentLoader';
import LeafletMap from '../../Helper/Leaflet/LeafletMap';



function TelemetriaMultas() {


    const [loading, setLoading] = useState(false);


    const dadosFilter = useContext(FilterTelemetriaContext);
    const { fetchData, filterFetchs, url } = dadosFilter;


    const [numeroTotal, setNumeroTotal] = useState(null);
    const [valorTotal, setValorTotal] = useState(null);
    const [valorTotalComDesconto, setValorTotalComDesconto] = useState(null);
    const [descontoPerdido, setDescontoPerdido] = useState(null);



    const [rankingMultas, setRankingMultas] = useState(null);
    const [rankingValor, setRankingValor] = useState(null);

    useEffect(() => {

        async function fetchDadosMultas() {


            try {
                setLoading(true);

                const [
                    jsonCards,
                    jsonRankingPlacas,
                    jsonRankingValor,
                ] = await Promise.all([
                    fetchData('obterCardsMultas', filterFetchs),
                    fetchData('obterRankingMultasPlacas', filterFetchs),
                    fetchData('obterRankingMultasValor', filterFetchs),
                ]);


                if (jsonCards) {
                    setNumeroTotal(jsonCards.total);
                    setValorTotal(jsonCards.valor_total);
                    setValorTotalComDesconto(jsonCards.valor_com_desconto);
                    setDescontoPerdido(jsonCards.desconto_perdido);
                }

                if (jsonRankingPlacas)
                    setRankingMultas(jsonRankingPlacas);

                if (jsonRankingValor)
                    setRankingValor(jsonRankingValor);

            } catch (error) {

            } finally {
                setLoading(false);
            }


        };

        if (url)
            fetchDadosMultas();




    }, [url])


    return (
        <section className=' animeLeft'>

            <div className="container-cards">
                <div className="card">
                    <h2>Nº Multas <IoNewspaperOutline /></h2>
                    <span className="card-value" >
                        {numeroTotal ? numeroTotal : 0} {loading ? <LoadingSpinner /> : ''}
                    </span>
                </div>
                <div className="card">
                    <h2>Valor total <TbReportMoney /></h2>
                    <span className="card-value" >
                        {valorTotal ? currency.format(valorTotal) : 0} {loading ? <LoadingSpinner /> : ''}
                    </span>
                </div>
                <div className="card">
                    <h2>Valor com Desconto <GrMoney /> </h2>
                    <span className="card-value">
                        {valorTotalComDesconto ? currency.format(valorTotalComDesconto) : 0} {loading ? <LoadingSpinner /> : ''}
                    </span>
                </div>
                <div className="card">
                    <h2>desconto perdido <IoAlertCircleOutline /> </h2>
                    <span className="card-value" style={{ color: '#dc2626' }}>
                        {descontoPerdido ? currency.format(descontoPerdido) : 0} {loading ? <LoadingSpinner /> : ''}
                    </span>
                </div>

            </div>


            <div className={styles.containerMultas}>
                <div className={styles.containerGraph}>

                    <div className={styles.doubleGraph}>
                        <div className={styles.box}>
                            {rankingMultas ? <Bar
                                data={rankingMultas}
                                layout='horizontal'
                                keys={['valor_total']}
                                dataType='currency'
                                // groupMode='grouped'
                                customBarWidth={true}
                                indexBy="placa"
                                margin={{ top: 10, right: 10, bottom: 0, left: 80 }}
                            /> : <BarContentLoader />}
                        </div>

                        <div className={styles.box}>
                            {rankingMultas ? <Pie
                                data={rankingMultas}
                                dataType='currency'
                            /> : <BarContentLoader />}
                        </div>
                    </div>


                    <div className={styles.doubleGraph}>
                        <div className={styles.box}>
                            {rankingValor ? <Bar
                                data={rankingValor}
                                layout='horizontal'
                                keys={['valor_total']}
                                dataType='currency'
                                customBarWidth={true}
                                indexBy="codigo_infracao"
                                margin={{ top: 10, right: 10, bottom: 0, left: 80 }}
                            /> : <BarContentLoader />}
                        </div>

                        <div className={styles.box}>
                            {rankingValor ? <Pie
                                data={rankingValor}
                                dataType='currency'
                            /> : <BarContentLoader />}
                        </div>
                    </div>


                </div>

                {/* <LeafletMap /> */}

            </div>


        </section>
    )
}

export default TelemetriaMultas