import React, { useEffect, useState } from 'react'
import styles from './TelemetriaComparativo.module.css';
import FiltroIndividual from '../../Components/Filtro/FiltroIndividual';
import { IoIosGitCompare } from "react-icons/io";


const camposComparativo = [
    {
        nome: 'Faixa Econômica',
        cor: '#15803d',
        id: 'economica',
        isBetter: 'high'
    },
    {
        nome: 'Faixa Potência',
        cor: '#ca8a04',
        id: 'potencia',
        isBetter: 'lower'
    },
    {
        nome: 'Alta Rotação',
        cor: '#991b1b',
        id: 'altaRotacao',
        isBetter: 'lower'
    },
    {
        nome: 'Marcha Lenta',
        cor: '#075985',
        id: 'marchaLenta',
        isBetter: 'lower'
    },
    {
        nome: 'Excesso Seco',
        cor: '#713f12',
        id: 'excessoSeco',
        isBetter: 'lower'
    },
    {
        nome: 'Excesso Chuva',
        cor: '#172554',
        id: 'excessoChuva',
        isBetter: 'lower'

    },
    {
        nome: 'Arrancada Brusca',
        cor: '#334155',
        id: 'arrancadaBrusca',
        isBetter: 'lower'

    },
    {
        nome: 'Parado Ligado',
        cor: "#4c1d95",
        id: 'paradoLigado',
        isBetter: 'lower'

    }, {
        nome: 'Produtividade',
        cor: "#134e4a",
        id: 'produtividade',
        isBetter: 'high'

    },
    {
        nome: 'Km/mês',
        cor: "#4b5563",
        id: 'kmMes',
        isBetter: 'high'

    },
    {
        nome: 'Km/dia',
        cor: "#57534e",
        id: 'kmDia',
        isBetter: 'high'
    },
    {
        nome: 'média',
        cor: "#1a2e05",
        id: 'media',
        isBetter: 'high'
    },

];

function TelemetriaComparativo() {

    const [comparativo, setComparativo] = useState({
        leftData: {
            economica: null,
            potencia: null,
            altaRotacao: null,
            marchaLenta: null,
            excessoSeco: null,
            excessoChuva: null,
            arrancadaBrusca: null,
            paradoLigado: null,
            produtividade: null,
            kmMes: null,
            kmDia: null,
            media: null
        },
        rightData: {
            economica: null,
            potencia: null,
            altaRotacao: null,
            marchaLenta: null,
            excessoSeco: null,
            excessoChuva: null,
            arrancadaBrusca: null,
            paradoLigado: null,
            produtividade: null,
            kmMes: null,
            kmDia: null,
            media: null
        }
    });


    useEffect(() => {

        async function fetchComparativoData() {

        };



    }, []);

    return (
        <section className='animeLeft'>

            <h1 className={styles.titulo}>Comparativo <IoIosGitCompare /></h1>

            <div className={styles.container}>
                <div className={styles.containerFiltros}>
                    <div className={styles.containerData}>
                        <FiltroIndividual placeholder="Ano" />
                        <FiltroIndividual placeholder="Mês" />
                        <FiltroIndividual placeholder="Dia" />
                    </div>
                    <FiltroIndividual placeholder="Filial" />
                    <FiltroIndividual placeholder="Marca" />
                    <FiltroIndividual placeholder="Modelo" />
                    <FiltroIndividual placeholder="Placa" />
                </div>

                <div className={styles.containerComparativo}>
                    {camposComparativo.map(({ nome, cor, id, isBetter }) => {

                        let colorLeft = '#000';
                        let colorRight = '#000';

                        // Aqui verifico qual dos dois tem a melhor performance.
                        if (comparativo.leftData[id] !== comparativo.rightData[id]) {
                            if (isBetter === 'high') {
                                comparativo.leftData[id] > comparativo.rightData[id] ? colorLeft = 'green' : colorRight = 'green';
                            } else {
                                comparativo.leftData[id] < comparativo.rightData[id] ? colorLeft = 'green' : colorRight = 'green';
                            }
                        }



                        return <div key={id}>
                            <span style={{ color: colorLeft }}>{comparativo.leftData[id] ? comparativo.leftData[id] : 0}</span>
                            <div style={{ backgroundColor: cor ? cor : '#000' }}>{nome}</div>
                            <span style={{ color: colorRight }}>{comparativo.rightData[id] ? comparativo.rightData[id] : 0}</span>
                        </div>
                    })}
                </div>
                <div className={styles.containerFiltros}>
                    <div className={styles.containerData}>
                        <FiltroIndividual placeholder="Ano" />
                        <FiltroIndividual placeholder="Mês" />
                        <FiltroIndividual placeholder="Dia" />
                    </div>
                    <FiltroIndividual placeholder="Filial" />
                    <FiltroIndividual placeholder="Marca" />
                    <FiltroIndividual placeholder="Modelo" />
                    <FiltroIndividual placeholder="Placa" />
                </div>
            </div>

        </section>
    )
}

export default TelemetriaComparativo