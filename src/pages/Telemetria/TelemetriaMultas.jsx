import React, { useContext, useEffect, useState } from 'react'
import { FilterTelemetriaContext } from '../../Context/FilterTelemetriaProvider';
import { TbReportMoney } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import LoadingSpinner from '../../Helper/LoadingSpinner';
import { CiCircleAlert } from "react-icons/ci";



import styles from './TelemetriaMultas.module.css';
import { currency, decimalFormatter } from '../../Helper/NumberFormatter';
import Bar from '../../Graph/Bar';
import Pie from '../../Graph/Pie';
import BarContentLoader from '../../Helper/Skeleton/BarContentLoader';
import LeafletMap from '../../Helper/Leaflet/LeafletMap';
import FilterMultas from '../../Components/Filtro/FilterMultas';
import { FilterMultasContext } from '../../Context/FilterMultasProvider';



function TelemetriaMultas() {


    const [loading, setLoading] = useState(false);


    const { fetchData, url } = useContext(FilterTelemetriaContext);

    const { placas, mes, ano } = useContext(FilterMultasContext);


    const [numeroTotal, setNumeroTotal] = useState(null);
    const [valorTotal, setValorTotal] = useState(null);
    const [quantidadeNotificacoes, setQuantidadeNotificacoes] = useState(null);
    const [valorAproximadoNotificacoes, setValorAproximadoNotificacoes] = useState(null);


    // States para os graficos
    const [rankingMultas, setRankingMultas] = useState(null);
    const [quantidadeMultas, setQuantidadeMultas] = useState(null);
    const [quantidadePorLocal, setQuantidadePorLocal] = useState(null);
    const [quantidadePorDescricao, setQuantidadePorDescricao] = useState(null);
    const [quantidadePorOrgao, setQuantidadePorOrgao] = useState(null);

    useEffect(() => {

        async function fetchDadosMultas() {


            try {
                setLoading(true);


                const [
                    jsonCards,
                    jsonDadosGraficos,
                ] = await Promise.all([
                    fetchData('obterCardsMultas', { placas, meses: mes, anos: ano }),
                    fetchData('obterDadosGraficosMultas', { placas, meses: mes, anos: ano }),
                ]);


                if (jsonCards && Array.isArray(jsonCards) && jsonCards.length) {
                    if (jsonCards[0].tipo === 'Multa') {
                        setNumeroTotal(jsonCards[0].quantidade);
                        setValorTotal(jsonCards[0].valor_total);

                        if (jsonCards[1]) {
                            setQuantidadeNotificacoes(jsonCards[1].quantidade);
                            setValorAproximadoNotificacoes(jsonCards[1].valor_total);
                        } else {
                            setQuantidadeNotificacoes(0);
                            setValorAproximadoNotificacoes(0);
                        }
                    } else {
                        setNumeroTotal(0);
                        setValorTotal(0);
                        setQuantidadeNotificacoes(jsonCards[0].quantidade);
                        setValorAproximadoNotificacoes(jsonCards[0].valor_total);
                    }



                } else {
                    setNumeroTotal(0);
                    setValorTotal(0);
                    setQuantidadeNotificacoes(0);
                    setValorAproximadoNotificacoes(0);
                }

                if (jsonDadosGraficos) {
                    setRankingMultas(jsonDadosGraficos.valorPlacas);
                    setQuantidadeMultas(jsonDadosGraficos.quantidadePlacas);
                    setQuantidadePorLocal(jsonDadosGraficos.quantidadePorLocal);
                    setQuantidadePorDescricao(jsonDadosGraficos.quantidadePorDescricao);
                    setQuantidadePorOrgao(jsonDadosGraficos.quantidadePorOrgao);
                }


            } catch (error) {

            } finally {
                setLoading(false);
            }


        };

        if (url)
            fetchDadosMultas();




    }, [url, placas, mes, ano])


    return (
        <section className=' animeLeft'>

            <div className="container-cards container-cards-multas" >
                <div className="card">
                    <h2>Nº Multas <IoNewspaperOutline /></h2>
                    <span className="card-value" >
                        {numeroTotal ? numeroTotal : 0} {loading ? <LoadingSpinner /> : ''}
                    </span>
                </div>
                <div className="card">
                    <h2>Valor total <TbReportMoney /></h2>
                    <span className="card-value" style={{ color: '#dc2626' }} >
                        {valorTotal ? currency.format(valorTotal) : 0} {loading ? <LoadingSpinner /> : ''}
                    </span>
                </div>
                <div className="card">
                    <h2>Nº Notificações <IoAlertCircleOutline /> </h2>
                    <span className="card-value">
                        {quantidadeNotificacoes ? quantidadeNotificacoes : 0} {loading ? <LoadingSpinner /> : ''}
                    </span>
                </div>
                <div className="card">
                    <h2>Valor Estimado Noti. <IoNewspaperOutline /> </h2>
                    <span className="card-value" style={{ color: '#999' }}>
                        {valorAproximadoNotificacoes ? currency.format(valorAproximadoNotificacoes) : 0} {loading ? <LoadingSpinner /> : ''}
                    </span>
                </div>

            </div>


            <div className={styles.containerMultas}>
                <div className={styles.containerGraph}>

                    <div className={styles.tripleGraph}>
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
                            {quantidadeMultas ? <Bar
                                data={quantidadeMultas}
                                keys={['quantidade']}
                                layout='horizontal'
                                indexBy="placa"
                                margin={{ top: 10, right: 10, bottom: 0, left: 80 }}

                            /> : <BarContentLoader />}
                        </div>

                        <div className={styles.box}>

                            {quantidadePorOrgao ? <Pie
                                data={quantidadePorOrgao}
                                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}

                            /> : <BarContentLoader />}

                        </div>
                    </div>


                    <div className={styles.doubleGraph}>
                        <div className={styles.box}>
                            {quantidadePorDescricao ? <Pie
                                data={quantidadePorDescricao}
                                margin={{ top: 60, right: 40, bottom: 60, left: 150 }}
                            /> : <BarContentLoader />}
                        </div>

                        <div className={styles.box}>
                            {quantidadePorLocal ? <Pie
                                data={quantidadePorLocal}
                                margin={{ top: 60, right: 60, bottom: 60, left: 60 }}

                            // dataType='currency'
                            /> : <BarContentLoader />}
                        </div>
                    </div>


                </div>


            </div>

            <FilterMultas />
        </section>
    )
}

export default TelemetriaMultas