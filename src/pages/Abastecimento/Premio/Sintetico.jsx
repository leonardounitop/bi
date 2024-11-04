import React, { useContext, useEffect, useState } from 'react'
import styles from './Sintetico.module.css';
import Table from '../../../Components/Table/Table';
import BarContentLoader from '../../../Helper/Skeleton/BarContentLoader';
import TableContentLoader from '../../../Helper/Skeleton/TableContentLoader';
import { FilterContext } from '../../../Context/FilterVault';
import { decimalFormatter, currency } from '../../../Helper/NumberFormatter'
import Line from '../../../Graph/Line';






// Funcao que transforma os dados para mostrar em grafico de linha.
const transformData = (data) => {
    const groupedData = {};

    data.forEach(item => {
        const { filial, valor_pago, mes } = item;

        if (!groupedData[filial]) {
            groupedData[filial] = [];
        }

        groupedData[filial].push({ x: mes, y: isNaN(parseFloat(valor_pago)) ? null : parseFloat(valor_pago) });
    });

    return Object.keys(groupedData).map(filial => ({
        id: filial,
        data: groupedData[filial]
    }));
};



const columnsSuperacao = [
    {
        field: 'premio',
        headerName: 'Premio Superação',
        type: 'text',
        width: 250
    },
    {
        field: 'primeiroSemestre',
        headerName: '1º Semestre',
        type: 'number',
        width: 150


    },
    {
        field: 'segundoSemestre',
        headerName: '2º Semestre',
        type: 'number',
        width: 150

    },
    {
        field: 'variacao',
        headerName: 'Variação',
        type: 'number',
        width: 150

    },
    {
        field: 'variacaoPerc',
        headerName: '%',
        type: 'number',
        width: 150,
        renderCell: ({ row }) => {

            const value = +row.variacaoPerc;
            let color = '#ef4444';

            if (value >= 0)
                color = '#15803d';


            return <div>
                <span className={styles.variacaoPerc} style={{ backgroundColor: color }} >
                    {` ${value ? value : 0}%`}
                </span>
            </div>
        },

    },
]




function Sintetico() {

    const { url, fetchData } = useContext(FilterContext);
    const [dadosAgregados, setDadosAgregados] = useState(null);
    const [dadosMatriz, setDadosMatriz] = useState(null);
    const [dadosCgr, setDadosCgr] = useState(null);



    const [lineValues, setLineValues] = useState(null);


    useEffect(() => {

        async function fetchSintetico() {
            const { agregado, cgr, matriz, grafico } = await fetchData('obterDadosSintetico');




            if (agregado && cgr && matriz && grafico) {
                const agregadosRows = [
                    {
                        id: 0,
                        premio: 'Km Percorrido',
                        primeiroSemestre: decimalFormatter.format(agregado.km_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(agregado.km_segundo_semestre),
                        variacao: decimalFormatter.format(agregado.diff_km),
                        variacaoPerc: agregado.perc_diff_km_percorrido
                    },
                    {
                        id: 1,
                        premio: 'Diesel | Litros',
                        primeiroSemestre: decimalFormatter.format(agregado.volume_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(agregado.volume_segundo_semestre),
                        variacao: decimalFormatter.format(agregado.diff_volume),
                        variacaoPerc: agregado.perc_diff_volume
                    },
                    {
                        id: 2,
                        premio: 'Média Km/l',
                        primeiroSemestre: decimalFormatter.format(agregado.media_diesel_primeiro),
                        segundoSemestre: decimalFormatter.format(agregado.media_diesel_segundo),
                        variacao: decimalFormatter.format(agregado.diff_media),
                        variacaoPerc: agregado.perc_diff_media
                    },
                    {
                        id: 3,
                        premio: 'Valor Gasto Diesel | R$',
                        primeiroSemestre: currency.format(agregado.valor_primeiro_semestre),
                        segundoSemestre: currency.format(agregado.valor_segundo_semestre),
                        variacao: currency.format(agregado.diff_valor_total),
                        variacaoPerc: agregado.perc_diff_valor_total
                    },
                    {
                        id: 4,
                        premio: `Economia | Litros | Média ${agregado.media_ano_anterior} ano anterior.`,
                        primeiroSemestre: decimalFormatter.format(agregado.economia_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(agregado.economia_segundo_semestre),
                        variacao: decimalFormatter.format(agregado.economia_total),
                        variacaoPerc: agregado.perc_diff_economia
                    },
                    {
                        id: 5,
                        premio: `Economia | R$ | Média ${agregado.media_ano_anterior} ano anterior.`,
                        primeiroSemestre: currency.format(agregado.economia_primeiro_semestre_monetario),
                        segundoSemestre: currency.format(agregado.economia_segundo_semestre_monetario),
                        variacao: currency.format(agregado.economia_total_monetario),
                        variacaoPerc: agregado.perc_diff_economia_monetario
                    },
                    {
                        id: 6,
                        premio: `Premiação - Motoristas`,
                        primeiroSemestre: currency.format(agregado.valor_premio_primeiro_semestre),
                        segundoSemestre: currency.format(agregado.valor_premio_segundo_semestre),
                        variacao: currency.format(agregado.valor_total_premio),
                        variacaoPerc: agregado.perc_diff_premio
                    },
                    {
                        id: 7,
                        premio: `Preço Médio`,
                        primeiroSemestre: currency.format(agregado.preco_medio_primeiro_semestre),
                        segundoSemestre: currency.format(agregado.preco_medio_segundo_semestre),
                        variacao: currency.format(agregado.diff_preco_medio),
                        variacaoPerc: agregado.perc_diff_preco_medio
                    },
                    {
                        id: 8,
                        premio: `Resultado Liquido`,
                        primeiroSemestre: currency.format(agregado.resultado_liquido_primeiro_semestre),
                        segundoSemestre: currency.format(agregado.resultado_liquido_segundo_semestre),
                        variacao: currency.format(agregado.total_liquido),
                        variacaoPerc: agregado.perc_diff_liquido
                    },


                ];

                const matrizRows = [
                    {
                        id: 0,
                        premio: 'Km Percorrido',
                        primeiroSemestre: decimalFormatter.format(matriz.km_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(matriz.km_segundo_semestre),
                        variacao: decimalFormatter.format(matriz.diff_km),
                        variacaoPerc: matriz.perc_diff_km_percorrido
                    },
                    {
                        id: 1,
                        premio: 'Diesel | Litros',
                        primeiroSemestre: decimalFormatter.format(matriz.volume_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(matriz.volume_segundo_semestre),
                        variacao: decimalFormatter.format(matriz.diff_volume),
                        variacaoPerc: matriz.perc_diff_volume
                    },
                    {
                        id: 2,
                        premio: 'Média Km/l',
                        primeiroSemestre: decimalFormatter.format(matriz.media_diesel_primeiro),
                        segundoSemestre: decimalFormatter.format(matriz.media_diesel_segundo),
                        variacao: decimalFormatter.format(matriz.diff_media),
                        variacaoPerc: matriz.perc_diff_media
                    },
                    {
                        id: 3,
                        premio: 'Valor Gasto Diesel | R$',
                        primeiroSemestre: currency.format(matriz.valor_primeiro_semestre),
                        segundoSemestre: currency.format(matriz.valor_segundo_semestre),
                        variacao: currency.format(matriz.diff_valor_total),
                        variacaoPerc: matriz.perc_diff_valor_total
                    },
                    {
                        id: 4,
                        premio: `Economia | Litros | Média ${matriz.media_ano_anterior} ano anterior.`,
                        primeiroSemestre: decimalFormatter.format(matriz.economia_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(matriz.economia_segundo_semestre),
                        variacao: decimalFormatter.format(matriz.economia_total),
                        variacaoPerc: matriz.perc_diff_economia
                    },
                    {
                        id: 5,
                        premio: `Economia | R$ | Média ${matriz.media_ano_anterior} ano anterior.`,
                        primeiroSemestre: currency.format(matriz.economia_primeiro_semestre_monetario),
                        segundoSemestre: currency.format(matriz.economia_segundo_semestre_monetario),
                        variacao: currency.format(matriz.economia_total_monetario),
                        variacaoPerc: matriz.perc_diff_economia_monetario
                    },
                    {
                        id: 6,
                        premio: `Premiação - Motoristas`,
                        primeiroSemestre: currency.format(matriz.valor_premio_primeiro_semestre),
                        segundoSemestre: currency.format(matriz.valor_premio_segundo_semestre),
                        variacao: currency.format(matriz.valor_total_premio),
                        variacaoPerc: matriz.perc_diff_premio
                    },
                    {
                        id: 7,
                        premio: `Preço Médio`,
                        primeiroSemestre: currency.format(matriz.preco_medio_primeiro_semestre),
                        segundoSemestre: currency.format(matriz.preco_medio_segundo_semestre),
                        variacao: currency.format(matriz.diff_preco_medio),
                        variacaoPerc: matriz.perc_diff_preco_medio
                    },
                    {
                        id: 8,
                        premio: `Resultado Liquido`,
                        primeiroSemestre: currency.format(matriz.resultado_liquido_primeiro_semestre),
                        segundoSemestre: currency.format(matriz.resultado_liquido_segundo_semestre),
                        variacao: currency.format(matriz.total_liquido),
                        variacaoPerc: matriz.perc_diff_liquido
                    },


                ];

                const cgrRows = [
                    {
                        id: 0,
                        premio: 'Km Percorrido',
                        primeiroSemestre: decimalFormatter.format(cgr.km_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(cgr.km_segundo_semestre),
                        variacao: decimalFormatter.format(cgr.diff_km),
                        variacaoPerc: cgr.perc_diff_km_percorrido
                    },
                    {
                        id: 1,
                        premio: 'Diesel | Litros',
                        primeiroSemestre: decimalFormatter.format(cgr.volume_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(cgr.volume_segundo_semestre),
                        variacao: decimalFormatter.format(cgr.diff_volume),
                        variacaoPerc: cgr.perc_diff_volume
                    },
                    {
                        id: 2,
                        premio: 'Média Km/l',
                        primeiroSemestre: decimalFormatter.format(cgr.media_diesel_primeiro),
                        segundoSemestre: decimalFormatter.format(cgr.media_diesel_segundo),
                        variacao: decimalFormatter.format(cgr.diff_media),
                        variacaoPerc: cgr.perc_diff_media
                    },
                    {
                        id: 3,
                        premio: 'Valor Gasto Diesel | R$',
                        primeiroSemestre: currency.format(cgr.valor_primeiro_semestre),
                        segundoSemestre: currency.format(cgr.valor_segundo_semestre),
                        variacao: currency.format(cgr.diff_valor_total),
                        variacaoPerc: cgr.perc_diff_valor_total
                    },
                    {
                        id: 4,
                        premio: `Economia | Litros | Média ${cgr.media_ano_anterior} ano anterior.`,
                        primeiroSemestre: decimalFormatter.format(cgr.economia_primeiro_semestre),
                        segundoSemestre: decimalFormatter.format(cgr.economia_segundo_semestre),
                        variacao: decimalFormatter.format(cgr.economia_total),
                        variacaoPerc: cgr.perc_diff_economia
                    },
                    {
                        id: 5,
                        premio: `Economia | R$ | Média ${cgr.media_ano_anterior} ano anterior.`,
                        primeiroSemestre: currency.format(cgr.economia_primeiro_semestre_monetario),
                        segundoSemestre: currency.format(cgr.economia_segundo_semestre_monetario),
                        variacao: currency.format(cgr.economia_total_monetario),
                        variacaoPerc: cgr.perc_diff_economia_monetario
                    },
                    {
                        id: 6,
                        premio: `Premiação - Motoristas`,
                        primeiroSemestre: currency.format(cgr.valor_premio_primeiro_semestre),
                        segundoSemestre: currency.format(cgr.valor_premio_segundo_semestre),
                        variacao: currency.format(cgr.valor_total_premio),
                        variacaoPerc: cgr.perc_diff_premio
                    },
                    {
                        id: 7,
                        premio: `Preço Médio`,
                        primeiroSemestre: currency.format(cgr.preco_medio_primeiro_semestre),
                        segundoSemestre: currency.format(cgr.preco_medio_segundo_semestre),
                        variacao: currency.format(cgr.diff_preco_medio),
                        variacaoPerc: cgr.perc_diff_preco_medio
                    },
                    {
                        id: 8,
                        premio: `Resultado Liquido`,
                        primeiroSemestre: currency.format(cgr.resultado_liquido_primeiro_semestre),
                        segundoSemestre: currency.format(cgr.resultado_liquido_segundo_semestre),
                        variacao: currency.format(cgr.total_liquido),
                        variacaoPerc: cgr.perc_diff_liquido
                    },


                ];

                const dadosGraficoTratado = transformData(grafico);


                setDadosAgregados(agregadosRows);
                setDadosMatriz(matrizRows);
                setDadosCgr(cgrRows);
                setLineValues(dadosGraficoTratado);
            }

        }


        if (url)
            fetchSintetico();

    }, [url])

    return (
        <section className='animeLeft'>

            <h2 className={styles.subtitulo}>Prêmio Superação - CGB/CGR</h2>

            <div className={styles.containerGraficoPrincipal}>
                <div className={styles.containerTable}>
                    {dadosAgregados ? <Table
                        rows={dadosAgregados}
                        columns={columnsSuperacao}
                        hideFooter={true}
                    /> : <TableContentLoader />}

                </div>


                <div className={styles.graph}>
                    <div className={styles.containerDoubleGraph}>
                        {lineValues ?
                            <Line
                                data={lineValues}
                                legend='Valor total pago mensal'
                                dataType='currency'
                            />
                            : <BarContentLoader />}
                    </div>
                </div>
            </div>

            <div className={styles.containerDoubleTable}>


                <div>
                    <h2 className={styles.subtitulo}>Prêmio Superação - CGB</h2>
                    <div className={styles.containerTable}>
                        {dadosMatriz ? <Table
                            rows={dadosMatriz}
                            columns={columnsSuperacao}
                            hideFooter={true}
                        /> : <TableContentLoader />}
                    </div>
                </div>


                <div >
                    <h2 className={styles.subtitulo}>Prêmio Superação - CGR</h2>

                    <div className={styles.containerTable}>
                        {dadosCgr ? <Table
                            rows={dadosCgr}
                            columns={columnsSuperacao}
                            hideFooter={true}
                        /> : <TableContentLoader />}
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Sintetico