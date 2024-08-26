import React, { useContext, useEffect, useState } from 'react'
import styles from './Analitico.module.css';
import Table from '../../../Components/Table/Table';
import { ptBR } from '@mui/x-data-grid/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FilterContext } from '../../../Context/FilterVault';
import TableContentLoader from '../../../Helper/Skeleton/TableContentLoader';
import { decimalFormatter, currency } from '../../../Helper/NumberFormatter';
import Line from '../../../Graph/Line';
import BarContentLoader from '../../../Helper/Skeleton/BarContentLoader';






// Funcao que transforma os dados para mostrar em grafico de linha.
const transformData = (data) => {
    const groupedData = {};

    data.forEach(item => {
        const { filial, deflator, mes } = item;

        if (!groupedData[filial]) {
            groupedData[filial] = [];
        }

        groupedData[filial].push({ x: mes, y: isNaN(parseFloat(deflator)) ? null : parseFloat(deflator) });
    });

    return Object.keys(groupedData).map(filial => ({
        id: filial,
        data: groupedData[filial]
    }));
};

const columnsAnalitico = [
    {
        field: 'id',
        headerName: 'Unidade',
        type: 'text',
    },
    {
        field: 'saldo_credito_debito',
        headerName: 'Valor Pago',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.saldo_credito_debito;

            return <div>
                <span >
                    {currency.format(value)}
                </span>
            </div>
        },
        width: 120
    },
    {
        field: 'deflator',
        headerName: 'Deflator',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.deflator;

            return <div>
                <span >
                    {currency.format(value)}
                </span>
            </div>
        },

    },
    {
        field: 'km_percorrido',
        headerName: 'Km',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.km_percorrido;

            return <div>
                <span >
                    {decimalFormatter.format(value)}
                </span>
            </div>
        },
    },
    {
        field: 'volume',
        headerName: 'litros',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.volume;

            return <div>
                <span >
                    {decimalFormatter.format(value)}
                </span>
            </div>
        },

    },
    {
        field: 'media_valor',
        headerName: 'R$/Km',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.media_valor;

            return <div>
                <span >
                    {currency.format(value)}
                </span>
            </div>
        },
    },
    {
        field: 'media',
        headerName: 'Média',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.media;
            let color = '#ef4444';

            if (value >= 0)
                color = '#15803d';


            return value ? <div>
                <span className={styles.variacaoPerc} style={{ backgroundColor: color }} >
                    {` ${value}%`}
                </span>
            </div> : ''
        },

    },
]

const columnsVariacao = [
    {
        field: 'id',
        headerName: 'Filial',
    },
    {
        field: 'premio',
        headerName: 'Prêmio',
        renderCell: ({ row }) => {

            const value = +row.premio;

            return <div>
                <span >
                    {currency.format(value)}
                </span>
            </div>
        },
        width: 120
    },
    {
        field: 'perc_premio',
        headerName: '% Premio',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.perc_premio;
            let color = '#ef4444';

            if (value >= 0)
                color = '#15803d';


            return value ? <div>
                <span className={styles.variacaoPerc} style={{ backgroundColor: color }} >
                    {` ${value}%`}
                </span>
            </div> : ''
        },
    },
    {
        field: 'km',
        headerName: 'Km',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.km;

            return <div>
                <span >
                    {decimalFormatter.format(value)}
                </span>
            </div>
        },
    },
    {
        field: 'perc_km',
        headerName: '% Km',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.perc_km;
            let color = '#ef4444';

            if (value >= 0)
                color = '#15803d';


            return value ? <div>
                <span className={styles.variacaoPerc} style={{ backgroundColor: color }} >
                    {` ${value}%`}
                </span>
            </div> : ''
        },
    },
    {
        field: 'volume',
        headerName: 'Volume',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.volume;

            return <div>
                <span >
                    {decimalFormatter.format(value)}
                </span>
            </div>
        },
    },
    {
        field: 'perc_volume',
        headerName: '% Volume',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.perc_volume;
            let color = '#ef4444';

            if (value >= 0)
                color = '#15803d';


            return value ? <div>
                <span className={styles.variacaoPerc} style={{ backgroundColor: color }} >
                    {` ${value}%`}
                </span>
            </div> : ''
        },
    },
    {
        field: 'media',
        headerName: 'Media',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.media;

            return <div>
                <span >
                    {currency.format(value)}
                </span>
            </div>
        },
    },
    {
        field: 'perc_media',
        headerName: '% Media',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.perc_media;
            let color = '#ef4444';

            if (value >= 0)
                color = '#15803d';


            return value ? <div>
                <span className={styles.variacaoPerc} style={{ backgroundColor: color }} >
                    {`${value}%`}
                </span>
            </div> : 0
        },
    },
]


const theme = createTheme(
    {
        palette: {
            primary: { main: '#1976d2' },
        },
    },
    ptBR,
);

function Analitico() {

    const { url, fetchData } = useContext(FilterContext);
    const [dadosPrimeiroSemestre, setDadosPrimeiroSemestre] = useState(null);
    const [dadosSegundoSemestre, setDadosSegundoSemestre] = useState(null);
    const [dadosVariacao, setDadosVariacao] = useState(null);

    const [lineValues, setLineValues] = useState(null);


    useEffect(() => {
        async function fetchAnalitico() {

            const { primeiroSemestre, segundoSemestre, variacao, grafico } = await fetchData('obterDadosAnalitico');


            if (primeiroSemestre && segundoSemestre && variacao && grafico) {
                setDadosPrimeiroSemestre(primeiroSemestre);
                setDadosSegundoSemestre(segundoSemestre);
                setDadosVariacao(variacao);

                const dadosGraficoTratado = transformData(grafico);

                console.log(dadosGraficoTratado);


                setLineValues(dadosGraficoTratado);
            }


        }


        if (url)
            fetchAnalitico();

    }, [url])


    return (
        <section className='animeLeft'>

            <div className={styles.containerDoubleTable}>


                <ThemeProvider theme={theme}>
                    <div className={styles.card}>
                        <h2 className={styles.subtitulo}>Prêmio Superação - 1º Semestre</h2>
                        <div className={styles.containerTable}>
                            {dadosPrimeiroSemestre ? <Table
                                rows={dadosPrimeiroSemestre}
                                columns={columnsAnalitico}
                                hideFooter={true}

                            /> : <TableContentLoader />}
                        </div>
                    </div>
                </ThemeProvider>


                <ThemeProvider theme={theme}>
                    <div >
                        <h2 className={styles.subtitulo}>Prêmio Superação - 2º Semestre</h2>


                        <div className={styles.containerTable}>
                            {dadosSegundoSemestre ? <Table
                                rows={dadosSegundoSemestre}
                                columns={columnsAnalitico}
                                hideFooter={true}
                            /> : <TableContentLoader />}
                        </div>

                    </div>
                </ThemeProvider>


            </div>

            <h2 className={styles.subtitulo} style={{ marginTop: 16 }}>Variação Período</h2>

            <div className={styles.containerGraficoPrincipal}>
                <ThemeProvider theme={theme}>

                    <div className={styles.containerTable}>
                        {dadosVariacao ? <Table
                            rows={dadosVariacao}
                            columns={columnsVariacao}
                            hideFooter={true}
                        /> : <TableContentLoader />}
                    </div>
                </ThemeProvider>


                <div className={styles.graph}>
                    {lineValues ?
                        <Line
                            data={lineValues}
                            legend='Valor deflator mensal'
                            dataType='currency'
                        />
                        : <BarContentLoader />}

                </div>



            </div>



        </section>
    )
}

export default Analitico;