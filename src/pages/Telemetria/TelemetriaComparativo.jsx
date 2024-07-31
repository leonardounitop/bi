import React from 'react'
import styles from './TelemetriaComparativo.module.css';
import FiltroIndividual from '../../Components/Filtro/FiltroIndividual';
import { IoIosGitCompare } from "react-icons/io";


const camposComparativo = [
    {
        nome: 'Faixa Econômica',
        cor: '#15803d'
    },
    {
        nome: 'Faixa Potência',
        cor: '#ca8a04',
    },
    {
        nome: 'Alta Rotação',
        cor: '#991b1b',

    },
    {
        nome: 'Marcha Lenta',
        cor: '#075985',

    },
    {
        nome: 'Excesso Seco',
        cor: '#713f12',

    },
    {
        nome: 'Excesso Chuva',
        cor: '#172554'

    },
    {
        nome: 'Arrancada Brusca',
        cor: '#334155'

    },
    {
        nome: 'Parado Ligado',
        cor: "#4c1d95"

    }, {
        nome: 'Produtividade',
        cor: "#134e4a"
    },
    {
        nome: 'Km/mês',
        cor: "#4b5563"

    },
    {
        nome: 'Km/dia',
        cor: "#57534e"

    },
    {
        nome: 'média',
        cor: "#1a2e05"
    },

]


const camposFiltro = [

]

function TelemetriaComparativo() {
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
                    {camposComparativo.map(({ nome, cor }) => {
                        return <div><span>0</span><div style={{ backgroundColor: cor ? cor : '#000' }}>{nome}</div><span>0</span></div>
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