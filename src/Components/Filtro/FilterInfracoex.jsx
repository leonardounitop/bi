import React, { useContext, useEffect, useState } from 'react';
import FiltroIndividual from './FiltroIndividual'; // Importando o componente FiltroIndividual
import { FilterTelemetriaContext } from '../../Context/FilterTelemetriaProvider';
import { useLocation } from 'react-router-dom';
import { FilterMultasContext } from '../../Context/FilterMultasProvider';

const FilterInfracoes = () => {
    const [loading, setLoading] = useState(false);

    const {
        url,
        fetchData
    } = useContext(FilterTelemetriaContext);

    const [placaList, setPlacaList] = useState(null);
    const [marcaList, setMarcaList] = useState(null);
    const [anosList, setAnosList] = useState(null);
    const [mesList, setMesList] = useState(null);
    const [diasList, setDiasList] = useState(null);



    // Função Genérica para setar o que ira no fetch.
    const handleFilterChange = (setFunction) => (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setFunction(values.length > 0 ? values : null);
    };

    // Fetch dos dados do Filtro
    useEffect(() => {

        const fetchAllData = async () => {
            setLoading(true);

            try {
                const [
                    filtros
                ] =
                    await Promise.all([
                        fetchData('obterFiltrosMultas'),
                    ]);

                if (typeof filtros === 'object' && 'placas' in filtros) {
                    setPlacaList(filtros.placas);
                    setMesesList(filtros.mes);
                    setAnosList(filtros.ano);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (url) fetchAllData();
    }, [
        url,
    ]);


    return (
        <section >
            <div className='listaFiltro animeLeft'>
                <form className='filters' style={{ fontFamily: 'sans-serif', fontSize: 14 }}>
                    <div className='containerFilters'>
                        <FiltroIndividual options={placaList} isLoading={loading} isDisabled={!placaList} onChange={handleFilterChange(setPlacas)} placeholder="Placa" />
                        <FiltroIndividual options={mesesList} isLoading={loading} isDisabled={!mesesList} onChange={handleFilterChange(setMes)} placeholder="Mês" />
                        <FiltroIndividual options={anosList} isLoading={loading} isDisabled={!anosList} onChange={handleFilterChange(setAno)} placeholder="Ano" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default FilterInfracoes;
