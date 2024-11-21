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
import Table from '../../Components/Table/Table';
import TableContentLoader from '../../Helper/Skeleton/TableContentLoader';
import { decimalFormatter } from '../../Helper/NumberFormatter';
import { Button } from '@mui/material';
import FilterInfracoes from '../../Components/Filtro/FilterInfracoex';
import { FilterMultasContext } from '../../Context/FilterMultasProvider';
import { FilterInfracoesContext } from '../../Context/FilterInfracoesProvider';

const arrayTelemetria = [
    { titulo: 'Excesso Pista Seca', icone: <FaRoad />, consulta: 'obterInfratoresSeco', btn: 'Seco' },
    { titulo: 'Excesso Pista Molhada', icone: <BsFillCloudRainHeavyFill />, consulta: 'obterInfratoresChuva', btn: 'Chuva' },
    { titulo: 'Freada Brusca', icone: <GiCarWheel />, consulta: 'obterInfratoresFreada', btn: 'Freada' },
    { titulo: 'Aceleração Brusca', icone: <IoIosSpeedometer />, consulta: 'obterInfratoresAceleracao', btn: 'Aceleração' },
    { titulo: 'Parado Ligado', icone: <FaClock />, consulta: 'obterInfratoresParado', btn: 'Parado Ligado' }
];


function TelemetriaInfracoes() {
    const dadosFilter = useContext(FilterTelemetriaContext);
    const { fetchData, url } = dadosFilter;

    const { filterFetchs } = useContext(FilterInfracoesContext)

    const [posArray, setPosArray] = useState(0);
    const [placasInfratoras, setPlacasInfratoras] = useState(null);
    const [dadosMapa, setDadosMapa] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantidadeInfracoes, setQuantidadeInfracoes] = useState(null);
    const [tempoInfracoes, setTempoInfracoes] = useState(null);

    const columns = [

        {
            field: 'placa',
            headerName: 'Placa',
            width: 150,
            renderCell: ({ row }) => (
                <div className={styles.containerPlaca}>
                    <span className={styles.placa}>
                        {row.placa}
                    </span>
                </div>
            ),
        },
        { field: 'evento', headerName: 'Evento', flex: 1 },
        {
            field: 'quantidade', headerName: 'Quantidade', type: 'number', flex: 1, renderCell: ({ row }) => (
                <div>
                    <span style={{ color: 'red' }}>
                        {`${decimalFormatter.format(+row.quantidade)}`}
                    </span>
                </div>
            ),
        },
        {
            field: 'duracao', headerName: 'Duracao', flex: 1, valueGetter: (row) => {
                // Verifica se a propriedade `duracao` está definida
                if (!row) return 0;
                // Converte a string de duração para segundos
                const [hours = 0, minutes = 0, seconds = 0] = row.split(':').map(Number);
                return hours * 3600 + minutes * 60 + seconds;
            }, renderCell: ({ row }) => {


                return <div>
                    <span style={{ color: '#a16207' }}>
                        {`${row.duracao}`}
                    </span>
                </div>
            },
        },
        {
            field: 'actions',
            headerName: 'Mapa',
            flex: 1,
            sortable: false,
            renderCell: ({ row }) => (
                <Button
                    variant="outlined"
                    color='info'
                    size='small'
                    disabled={loading}
                    onClick={() => handleFechMapData(row)}
                >
                    Mostrar Infrações
                </Button>
            ),
        },

    ];


    async function handleFechMapData({ placa, evento }) {


        setLoading(true);
        try {

            const json = await fetchData('obterDadosMapaInfracoes', { ...filterFetchs, placas: [placa], evento: [evento] });

            if (Array.isArray(json)) {
                setDadosMapa(json);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }



    }


    useEffect(() => {
        async function fetchDados() {
            try {
                setLoading(true);
                const consulta = arrayTelemetria[posArray].consulta;
                const json = await fetchData(consulta, filterFetchs);

                if (json) {
                    setPlacasInfratoras(json.placas);
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
        <>
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
                <div className={styles.containerGraphs}  >
                    <div style={{ minHeight: 650, maxHeight: 650 }}>
                        {placasInfratoras ? <Table columns={columns} rows={placasInfratoras} loading={loading} /> : <TableContentLoader />}
                    </div>
                    <LeafletMap dados={dadosMapa} />

                </div>

            </section>
            <FilterInfracoes />

        </>

    );
}

export default TelemetriaInfracoes;
