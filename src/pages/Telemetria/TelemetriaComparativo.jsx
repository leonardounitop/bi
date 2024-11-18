import React, { useContext, useEffect, useState } from 'react'
import styles from './TelemetriaComparativo.module.css';
import FiltroIndividual from '../../Components/Filtro/FiltroIndividual';
import { IoIosGitCompare } from "react-icons/io";
import { FilterTelemetriaContext } from '../../Context/FilterTelemetriaProvider';
import { decimalFormatter } from '../../Helper/NumberFormatter'

// Função Genérica para setar o que ira no fetch.
const handleFilterChange = (setFunction) => (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setFunction(values.length > 0 ? values : null);
};

const camposComparativo = [
    {
        nome: 'Faixa Econômica',
        cor: '#15803d',
        id: 'economica',
        type: '%',
        isBetter: true
    },
    {
        nome: 'Faixa Potência',
        cor: '#ca8a04',
        id: 'potencia',
        type: '%',
        isBetter: false
    },
    {
        nome: 'Alta Rotação',
        cor: '#991b1b',
        id: 'altarotacao',
        type: '%',
        isBetter: false
    },
    {
        nome: 'Marcha Lenta',
        cor: '#075985',
        id: 'marchalenta',
        type: '%',
        isBetter: false
    },
    {
        nome: 'Excesso Seco',
        cor: '#713f12',
        id: 'excessoseco',
        type: '',
        isBetter: false
    },
    {
        nome: 'Excesso Chuva',
        cor: '#172554',
        id: 'excessochuva',
        type: '',
        isBetter: false

    },
    {
        nome: 'Arrancada Brusca',
        cor: '#334155',
        id: 'arrancadabrusca',
        type: '',
        isBetter: false

    },
    {
        nome: 'Freada Brusca',
        cor: '#224144',
        id: 'freadabrusca',
        type: '',
        isBetter: false
    },
    {
        nome: 'Parado Ligado',
        cor: "#4c1d95",
        id: 'paradoligado',
        type: '',

        isBetter: false

    }, {
        nome: 'Produtividade',
        cor: "#134e4a",
        id: 'produtividade',
        type: '%',
        isBetter: true

    },
    {
        nome: 'KM',
        cor: "#4b5563",
        id: 'km',
        type: '',
        isBetter: true

    },
    {
        nome: 'Média',
        cor: "#1a2e05",
        id: 'media',
        type: 'km/l',
        isBetter: true
    },

];

function TelemetriaComparativo() {


    const [leftData, setLeftData] = useState({
        economica: null,
        potencia: null,
        altaRotacao: null,
        marchalenta: null,
        excessoseco: null,
        excessochuva: null,
        arrancadabrusca: null,
        freadabrusca: null,
        paradoligado: null,
        produtividade: null,
        km: null,
        media: null
    })

    const [rightData, setRightData] = useState({
        economica: null,
        potencia: null,
        altaRotacao: null,
        marchalenta: null,
        excessoseco: null,
        excessochuva: null,
        arrancadabrusca: null,
        freadabrusca: null,
        paradoligado: null,
        produtividade: null,
        km: null,
        media: null
    });


    const [anos, setAnos] = useState(null);
    const [meses, setMeses] = useState(null);
    const [dias, setDias] = useState(null);
    const [marcas, setMarcas] = useState(null);
    const [placas, setPlacas] = useState(null);

    const [ranos, setRAnos] = useState(null);
    const [rmeses, setRMeses] = useState(null);
    const [rdias, setRDias] = useState(null);
    const [rmarcas, setRMarcas] = useState(null);
    const [rplacas, setRPlacas] = useState(null);

    const [leftAnosList, setLeftAnosList] = useState(null);
    const [leftMesesList, setLeftMesesList] = useState(null);
    const [leftDiasList, setLeftDiasList] = useState(null);

    const [leftMarcasList, setLeftMarcasList] = useState(null);
    const [leftPlacasList, setLeftPlacasList] = useState(null);

    const [leftLoading, setLeftLoading] = useState(null);


    const [rightAnosList, setRightAnosList] = useState(null);
    const [rightMesesList, setRightMesesList] = useState(null);
    const [rightDiasList, setRightDiasList] = useState(null);

    const [rightMarcasList, setRightMarcasList] = useState(null);
    const [rightPlacasList, setRightPlacasList] = useState(null);

    const [rightLoading, setRightLoading] = useState(null);


    const {
        url,
        fetchData
    } = useContext(FilterTelemetriaContext);

    // Popular os filtros
    useEffect(() => {

        async function fetchPopularFiltros() {
            try {
                setLeftLoading(true);

                const [
                    placasJson,
                    anosJson,
                    mesesJson,
                    diasJson,
                    marcaJson
                ] =
                    await Promise.all([
                        fetchData('obterPlacas', { anos, meses, dias, marcas }),
                        fetchData('obterAnos', { placas, meses, dias, marcas }),
                        fetchData('obterMeses', { anos, placas, dias, marcas }),
                        fetchData('obterDias', { anos, placas, marcas, meses }),
                        fetchData('obterMarca', { placas, anos, meses, dias }),
                    ]);

                setLeftPlacasList(placasJson);
                setLeftAnosList(anosJson);
                setLeftMesesList(mesesJson);
                setLeftDiasList(diasJson);
                setLeftMarcasList(marcaJson);

            } catch (e) {
                console.log(e);
            } finally {
                setLeftLoading(false);
            }

        }

        if (url) fetchPopularFiltros();

    }, [url, anos, meses, dias, marcas, placas]);

    // filtros right
    useEffect(() => {

        async function fetchPopularFiltros() {
            try {
                setRightLoading(true);

                const [
                    placasJson,
                    anosJson,
                    mesesJson,
                    diasJson,
                    marcaJson
                ] =
                    await Promise.all([
                        fetchData('obterPlacas', { anos: ranos, meses: rmeses, dias: rdias, marcas: rmarcas }),
                        fetchData('obterAnos', { meses: rmeses, dias: rdias, marcas: rmarcas, placas: rplacas }),
                        fetchData('obterMeses', { anos: ranos, dias: rdias, marcas: rmarcas, placas: rplacas }),
                        fetchData('obterDias', { anos: ranos, meses: rmeses, marcas: rmarcas, placas: rplacas }),
                        fetchData('obterMarca', { anos: ranos, meses: rmeses, dias: rdias, placas: rplacas }),
                    ]);

                setRightPlacasList(placasJson);
                setRightAnosList(anosJson);
                setRightMesesList(mesesJson);
                setRightDiasList(diasJson);
                setRightMarcasList(marcaJson);

            } catch (e) {
                console.log(e);
            } finally {
                setRightLoading(false);
            }

        }

        if (url) fetchPopularFiltros();

    }, [url, ranos, rmeses, rdias, rmarcas, rplacas]);

    // Popular dados Esquerda
    useEffect(() => {
        async function fetchLeftData() {
            const [jsonLeftData] = await Promise.all([fetchData('obterDadosComparativo', { anos, meses, dias, marcas, placas })]);

            setLeftData({ ...leftData, ...jsonLeftData });


        }

        if (url) fetchLeftData();
    }, [url, anos, meses, dias, marcas, placas])


    useEffect(() => {
        async function fetchRightData() {

            const [jsonRightData] = await Promise.all([fetchData('obterDadosComparativo', {
                anos: ranos, meses: rmeses, dias: rdias,
                marcas: rmarcas, placas: rplacas
            })]);


            setRightData({ ...rightData, ...jsonRightData });
        }

        if (url) fetchRightData();
    }, [url, ranos, rmeses, rdias, rmarcas, rplacas])


    return (
        <section className='animeLeft'>
            <h1 className={styles.titulo}>Comparativo <IoIosGitCompare /></h1>

            <div className={styles.container}>
                <div className={styles.containerFiltros}>
                    <div className={styles.containerData}>
                        <FiltroIndividual placeholder="Ano" isDisabled={!leftAnosList} options={leftAnosList} isLoading={leftLoading} onChange={handleFilterChange(setAnos)} />
                        <FiltroIndividual placeholder="Mês" isDisabled={!leftMesesList} options={leftMesesList} isLoading={leftLoading} onChange={handleFilterChange(setMeses)} />
                        <FiltroIndividual placeholder="Dia" isDisabled={!leftDiasList} options={leftDiasList} isLoading={leftLoading} onChange={handleFilterChange(setDias)} />
                    </div>
                    <FiltroIndividual placeholder="Marca" isDisabled={!leftMarcasList} options={leftMarcasList} isLoading={leftLoading} onChange={handleFilterChange(setMarcas)} />
                    <FiltroIndividual placeholder="Placa" isDisabled={!leftPlacasList} options={leftPlacasList} isLoading={leftLoading} onChange={handleFilterChange(setPlacas)} />
                </div>

                <div className={styles.containerComparativo}>
                    {camposComparativo.map(({ nome, cor, id, isBetter, type }) => {

                        let colorLeft = '#000';
                        let colorRight = '#000';

                        // Aqui verifico qual dos dois tem a melhor performance.

                        if (leftData[id] !== rightData[id]) {
                            if (isBetter) {
                                +leftData[id] > +rightData[id] ? colorLeft = 'green' : colorRight = 'green';
                            } else {
                                +leftData[id] < +rightData[id] ? colorLeft = 'green' : colorRight = 'green';
                            }
                        }

                        return <div key={id}>
                            <span style={{ color: colorLeft }}>{leftData[id] ? `${decimalFormatter.format(leftData[id])}${type}` : 0}</span>
                            <div style={{ backgroundColor: cor ? cor : '#000' }}>{nome}</div>
                            <span style={{ color: colorRight }}>{rightData[id] ? `${decimalFormatter.format(rightData[id])}${type}` : 0}</span>
                        </div>
                    })}
                </div>
                <div className={styles.containerFiltros}>
                    <div className={styles.containerData}>
                        <FiltroIndividual placeholder="Ano" isDisabled={!rightAnosList} options={rightAnosList} isLoading={rightLoading} onChange={handleFilterChange(setRAnos)} />
                        <FiltroIndividual placeholder="Mês" isDisabled={!rightMesesList} options={rightMesesList} isLoading={rightLoading} onChange={handleFilterChange(setRMeses)} />
                        <FiltroIndividual placeholder="Dia" isDisabled={!rightDiasList} options={rightDiasList} isLoading={rightLoading} onChange={handleFilterChange(setRDias)} />
                    </div>
                    <FiltroIndividual placeholder="Marca" isDisabled={!rightMarcasList} options={rightMarcasList} isLoading={rightLoading} onChange={handleFilterChange(setRMarcas)} />
                    <FiltroIndividual placeholder="Placa" isDisabled={!rightPlacasList} options={rightPlacasList} isLoading={rightLoading} onChange={handleFilterChange(setRPlacas)} />
                </div>
            </div>



        </section>
    )
}

export default TelemetriaComparativo