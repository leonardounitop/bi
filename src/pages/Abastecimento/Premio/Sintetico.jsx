import React from 'react'
import styles from './Sintetico.module.css';
import Table from '../../../Components/Table/Table';
import { ptBR } from '@mui/x-data-grid/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const columnsSuperacao = [
    {
        field: 'premio',
        headerName: 'Premio Superação',
        type: 'text',
        width: 200
    },
    {
        field: 'primeiroSemestre',
        headerName: '1º Semestre',
        type: 'text',


    },
    {
        field: 'segundoSemestre',
        headerName: '2º Semestre',
        type: 'text',

    },
    {
        field: 'variacao',
        headerName: 'Variação',
        type: 'number',

    },
    {
        field: 'variacaoPerc',
        headerName: '%',
        type: 'number',

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

function Sintetico() {
    return (
        <section className='animeLeft'>

            <h2 className={styles.subtitulo}>Prêmio Superação - CGB/CGR</h2>

            <div className={styles.containerGraficoPrincipal}>
                <ThemeProvider theme={theme}>
                    <Table
                        rows={[
                            { id: 1, modelo: 'teste', isso: 'teste2' },
                            { id: 2, modelo: 'dadsa', isso: 'ewqeqw' },
                            { id: 3, modelo: 'ddd', isso: 'adsaa' },
                        ]}
                        columns={columnsSuperacao}
                        autoHeight={true}
                        hideFooter={true}
                    />
                </ThemeProvider>


                <div className={styles.doubleGraph}>
                    <div className={styles.containerDoubleGraph}>

                    </div>

                    <div className={styles.containerDoubleGraph}>

                    </div>
                </div>



            </div>


            <div className={styles.containerDoubleTable}>


                <ThemeProvider theme={theme}>
                    <div>
                        <h2 className={styles.subtitulo}>Prêmio Superação - CGB</h2>
                        <Table
                            rows={[
                                { id: 1, modelo: 'teste', isso: 'teste2' },
                                { id: 2, modelo: 'dadsa', isso: 'ewqeqw' },
                                { id: 3, modelo: 'ddd', isso: 'adsaa' },
                            ]}
                            columns={columnsSuperacao}
                            hideFooter={true}
                            autoHeight={true}

                        />
                    </div>
                </ThemeProvider>


                <ThemeProvider theme={theme}>
                    <div >
                        <h2 className={styles.subtitulo}>Prêmio Superação - CGR</h2>

                        <Table
                            rows={[
                                { id: 1, modelo: 'teste', isso: 'teste2' },
                                { id: 2, modelo: 'dadsa', isso: 'ewqeqw' },
                                { id: 3, modelo: 'ddd', isso: 'adsaa' },
                            ]}
                            columns={columnsSuperacao}
                            hideFooter={true}
                            autoHeight={true}

                        />
                    </div>
                </ThemeProvider>


            </div>
        </section>
    )
}

export default Sintetico