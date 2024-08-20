import React from 'react'
import styles from './Analitico.module.css';
import Table from '../../../Components/Table/Table';
import { ptBR } from '@mui/x-data-grid/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const columnsAnalitico = [
    {
        field: 'unidade',
        headerName: 'Unidade',
        type: 'text',
        width: 200
    },
    {
        field: 'valor',
        headerName: 'Valor Pago',
        type: 'number',
    },
    {
        field: 'deflator',
        headerName: 'Deflator',
        type: 'number',
    },
    {
        field: 'km',
        headerName: 'Km',
        type: 'number',
    },
    {
        field: 'litros',
        headerName: 'litros',
        type: 'number',

    },
    {
        field: 'valorkm',
        headerName: 'R$/Km',
        type: 'number',

    },
    {
        field: 'media',
        headerName: 'Média',
        type: 'number',

    },
]

const columnsVariacao = [
    {
        field: 'premio',
        headerName: 'Prêmio',
        width: 200
    },
    {
        field: 'km',
        headerName: 'Km',
        type: 'number',
    },
    {
        field: 'litros',
        headerName: 'Litros',
        type: 'number',
    },
    {
        field: 'media',
        headerName: 'Média',
        type: 'number',
        width: 200
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

            <div className={styles.containerDoubleTable}>


                <ThemeProvider theme={theme}>
                    <div>
                        <h2 className={styles.subtitulo}>Prêmio Superação - 1º Semestre</h2>
                        <Table
                            rows={[
                                { id: 1, modelo: 'teste', isso: 'teste2' },
                                { id: 2, modelo: 'dadsa', isso: 'ewqeqw' },
                                { id: 3, modelo: 'ddd', isso: 'adsaa' },
                            ]}
                            columns={columnsAnalitico}
                            hideFooter={true}
                            autoHeight={true}

                        />
                    </div>
                </ThemeProvider>


                <ThemeProvider theme={theme}>
                    <div >
                        <h2 className={styles.subtitulo}>Prêmio Superação - 2º Semestre</h2>

                        <Table
                            rows={[
                                { id: 1, modelo: 'teste', isso: 'teste2' },
                                { id: 2, modelo: 'dadsa', isso: 'ewqeqw' },
                                { id: 3, modelo: 'ddd', isso: 'adsaa' },
                            ]}
                            columns={columnsAnalitico}
                            hideFooter={true}
                            autoHeight={true}

                        />
                    </div>
                </ThemeProvider>


            </div>

            <h2 className={styles.subtitulo} style={{ marginTop: 16 }}>Variação Período</h2>

            <div className={styles.containerGraficoPrincipal}>
                <ThemeProvider theme={theme}>
                    <Table
                        rows={[
                            { id: 1, modelo: 'teste', isso: 'teste2' },
                            { id: 2, modelo: 'dadsa', isso: 'ewqeqw' },
                            { id: 3, modelo: 'ddd', isso: 'adsaa' },
                        ]}
                        columns={columnsVariacao}
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



        </section>
    )
}

export default Sintetico