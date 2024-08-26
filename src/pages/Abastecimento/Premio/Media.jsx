import React, { useContext, useEffect, useState } from 'react'
import styles from './Sintetico.module.css';
import Table from '../../../Components/Table/Table';
import { ptBR } from '@mui/x-data-grid/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FilterContext } from '../../../Context/FilterVault';
import TableContentLoader from '../../../Helper/Skeleton/TableContentLoader';
import { decimalFormatter, currency } from '../../../Helper/NumberFormatter'

const columnsMediaMaxima = [
    {
        field: 'id',
        headerName: 'Prêmio',
        type: 'text',
        width: 150,
    },
    {
        field: 'valor',
        headerName: 'Valor Prêmio',
        type: 'number',
        width: 200,
        renderCell: ({ row }) => {

            const value = +row.valor;

            return <div>
                <span >
                    {currency.format(value)}
                </span>
            </div>
        },
    },
    {
        field: 'media',
        headerName: 'Média R$',
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
        field: 'maximo',
        headerName: 'Maximo R$',
        type: 'number',
        renderCell: ({ row }) => {

            const value = +row.maximo;

            return <div>
                <span >
                    {currency.format(value)}
                </span>
            </div>
        },
    },
    {
        field: 'motoristas',
        headerName: 'Motoristas',
        type: 'number',

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
]


const theme = createTheme(
    {
        palette: {
            primary: { main: '#1976d2' },
        },
    },
    ptBR,
);


// obterDadosMedia

function Media() {

    const { url, fetchData } = useContext(FilterContext);

    const [primeiroSemestreMatriz, setPrimeiroSemestreMatriz] = useState(null);
    const [primeiroSemestreCGR, setPrimeiroSemestreCGR] = useState(null);
    const [segundoSemestreMatriz, setSegundoSemestreMatriz] = useState(null);
    const [segundoSemestreCGR, setSegundoSemestreCGR] = useState(null);



    useEffect(() => {
        async function fetchAnalitico() {


            try {
                const {
                    primeiroSemestreMatriz,
                    primeiroSemestreCGR,
                    segundoSemestreMatriz,
                    segundoSemestreCGR
                } = await fetchData('obterDadosMedia');



                console.log(segundoSemestreMatriz);

                if (primeiroSemestreMatriz, primeiroSemestreCGR, segundoSemestreMatriz, segundoSemestreCGR) {
                    setPrimeiroSemestreMatriz(primeiroSemestreMatriz);
                    setPrimeiroSemestreCGR(primeiroSemestreCGR);
                    setSegundoSemestreMatriz(segundoSemestreMatriz);
                    setSegundoSemestreCGR(segundoSemestreCGR);
                }


            } catch (error) {

                console.log('Erro Fetch Analitico: ', error);
            }



        }


        if (url)
            fetchAnalitico();

    }, [url])


    return (
        <section className='animeLeft'>


            <div className={styles.containerDoubleTable}>


                <ThemeProvider theme={theme}>
                    <div>
                        <h2 className={styles.subtitulo}>2024 / 1 - CGR</h2>
                        <div className={styles.containerTable}>
                            {primeiroSemestreCGR ? <Table
                                rows={primeiroSemestreCGR}
                                columns={columnsMediaMaxima}
                                hideFooter={true}
                            /> : <TableContentLoader />}
                        </div>
                    </div>
                </ThemeProvider>


                <ThemeProvider theme={theme}>
                    <div >
                        <h2 className={styles.subtitulo}>2024 / 1 - CGB</h2>

                        <div className={styles.containerTable}>
                            {primeiroSemestreMatriz ? <Table
                                rows={primeiroSemestreMatriz}
                                columns={columnsMediaMaxima}
                                hideFooter={true}
                            /> : <TableContentLoader />}
                        </div>
                    </div>
                </ThemeProvider>


            </div>

            <div className={styles.containerDoubleTable} style={{ marginTop: 16 }}>


                <ThemeProvider theme={theme}>
                    <div>
                        <h2 className={styles.subtitulo}>2024 / 2 - CGR</h2>
                        <div className={styles.containerTable}>
                            {segundoSemestreCGR ? <Table
                                rows={segundoSemestreCGR}
                                columns={columnsMediaMaxima}
                                hideFooter={true}
                            /> : <TableContentLoader />}
                        </div>
                    </div>
                </ThemeProvider>


                <ThemeProvider theme={theme}>
                    <div >
                        <h2 className={styles.subtitulo}>2024 / 2 - CGB</h2>

                        <div className={styles.containerTable}>
                            {segundoSemestreMatriz ? <Table
                                rows={segundoSemestreMatriz}
                                columns={columnsMediaMaxima}
                                hideFooter={true}
                            /> : <TableContentLoader />}
                        </div>
                    </div>
                </ThemeProvider>


            </div>
        </section>
    )
}

export default Media