import React, { useContext, useEffect, useState } from 'react';
import styles from './TelemetriaInfracoes.module.css';
import { BsFillCloudRainHeavyFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import { GiCarWheel } from "react-icons/gi";
import { FaRoad } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import BarContentLoader from '../../Helper/Skeleton/BarContentLoader';
import { FilterTelemetriaContext } from '../../Context/FilterTelemetriaProvider';
import Bar from '../../Graph/Bar';
import LeafletMap from '../../Helper/Leaflet/LeafletMap';
import LoadingSpinner from '../../Helper/LoadingSpinner'


const arrayTelemetria = [
    { titulo: 'Excesso Pista Seca', icone: <FaRoad />, consulta: 'obterInfratoresSeco', btn: 'Seco' },
    { titulo: 'Excesso Pista Molhada', icone: <BsFillCloudRainHeavyFill />, consulta: 'obterInfratoresChuva', btn: 'Chuva' },
    { titulo: 'Freada Brusca', icone: <GiCarWheel />, consulta: 'obterInfratoresFreada', btn: 'Freada' },
    { titulo: 'Aceleração Brusca', icone: <IoIosSpeedometer />, consulta: 'obterInfratoresAceleracao', btn: 'Aceleração' },
    { titulo: 'Parado Ligado', icone: <FaClock />, consulta: 'obterInfratoresParado', btn: 'Parado Ligado' }
];

function TelemetriaInfracoes() {
    const dadosFilter = useContext(FilterTelemetriaContext);
    const { fetchData, filterFetchs, url } = dadosFilter;

    const [posArray, setPosArray] = useState(0);
    const [placasInfratoras, setPlacasInfratoras] = useState(null);
    const [motoristasInfratores, setMotoristasInfratores] = useState(null);
    const [infracaoMensal, setInfracaoMensal] = useState(null);
    const [dadosMapa, setDadosMapa] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantidadeInfracoes, setQuantidadeInfracoes] = useState(null);
    const [tempoInfracoes, setTempoInfracoes] = useState(null);

    useEffect(() => {
        async function fetchDados() {
            try {
                setLoading(true);
                const consulta = arrayTelemetria[posArray].consulta;
                const json = await fetchData(consulta, filterFetchs);


                if (json) {

                    console.log(json);

                    const placasInfratoras = json && json.placas.length ? json.placas : [{ placa: 'N/A', infracoes: 0 }];
                    const motoristasInfratores = json && json.motoristas.length ? json.motoristas : [{ id: 'N/A', infracoes: 0 }];
                    const infratoresMensal = json && json.mensal.length ? json.mensal : [{ id: 'N/A', infracoes: 0 }];

                    setPlacasInfratoras(placasInfratoras);
                    setMotoristasInfratores(motoristasInfratores);
                    setInfracaoMensal(infratoresMensal);
                    setDadosMapa(json.mapa);
                    setQuantidadeInfracoes(json.total);
                    setTempoInfracoes(json.duracao);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        if (url) fetchDados();
    }, [posArray, url, fetchData, filterFetchs]);

    return (
        <section className='animeLeft'>
            <div className={styles.containerTitulo}>
                <h1 className={styles.titulo}>{arrayTelemetria[posArray].titulo}   {arrayTelemetria[posArray].icone}</h1>
                <span className={styles.label}>Infrações: <span> {(quantidadeInfracoes !== null) && !loading ? quantidadeInfracoes : <LoadingSpinner />} </span></span>
                <span className={styles.label}>Tempo Total: <span> {tempoInfracoes && !loading ? tempoInfracoes : <LoadingSpinner />} </span> </span>
                <div className={styles.containerBtns}>
                    {arrayTelemetria.map((arr, index) => (
                        <button key={index} onClick={() => setPosArray(index)}
                            style={{ backgroundColor: index === posArray ? '#4770e0' : '#1e3a8a' }}>
                            {arr.btn} {arr.icone}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.containerGraphs}>
                <div>
                    <div className={styles.containerDoubleGraphs}>
                        <div className={styles.containerBar}>
                            {placasInfratoras && !loading ?
                                <Bar data={placasInfratoras} layout='horizontal' keys={['infracoes']} customBarWidth={true} indexBy="placa" margin={{ top: 10, right: 10, bottom: 0, left: 80 }} /> : <BarContentLoader />}
                        </div>
                        <div className={styles.containerBar}>
                            {motoristasInfratores && !loading ? <Bar data={motoristasInfratores} layout='horizontal' keys={['infracoes']} customBarWidth={true} indexBy="motorista" margin={{ top: 10, right: 10, bottom: 0, left: 100 }} /> : <BarContentLoader />}
                        </div>
                    </div>
                    <div className={styles.containerBar}>
                        {infracaoMensal && !loading ? <Bar data={infracaoMensal} keys={['infracoes']} indexBy="mes" margin={{ top: 10, right: 10, bottom: 30, left: 50 }} /> : <BarContentLoader />}
                    </div>
                </div>
                <LeafletMap dados={dadosMapa} />
            </div>
        </section>
    );
}

export default TelemetriaInfracoes;
