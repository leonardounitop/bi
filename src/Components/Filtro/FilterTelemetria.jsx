import React, { useContext, useEffect, useState } from 'react';
import FiltroIndividual from './FiltroIndividual'; // Importando o componente FiltroIndividual
import { FilterTelemetriaContext } from '../../Context/FilterTelemetriaProvider';
import { useLocation } from 'react-router-dom';

const Filter = () => {
    const [loading, setLoading] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { pathname } = useLocation();

    const {
        dias,
        setDias,
        anos,
        setAnos,
        placas,
        setPlacas,
        meses,
        setMeses,
        filial,
        setFilial,
        marcas,
        setMarcas,
        url,
        fetchData
    } = useContext(FilterTelemetriaContext);

    const [placaList, setPlacaList] = useState(null);
    const [marcasList, setMarcasList] = useState(null);
    const [anosList, setAnosList] = useState(null);
    const [mesesList, setMesesList] = useState(null);
    const [diasList, setDiasList] = useState(null);




    const [consultaPlacas, setConsultaPlacas] = useState('obterPlacas');


    // Função Genérica para setar o que ira no fetch.
    const handleFilterChange = (setFunction) => (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setFunction(values.length > 0 ? values : null);
    };

    // Desabilitar o filtro em páginas que não precisam
    useEffect(() => {
        if (
            pathname.includes('telemetria/infracoes')
        ) {
            setConsultaPlacas('obterPlacasInfracoes');
        } else {
            setConsultaPlacas('obterPlacas');
        }

        if (pathname.includes('telemetria/comparativo')) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }

    }, [pathname]);

    // Fetch dos dados do Filtro
    useEffect(() => {

        const fetchAllData = async () => {
            setLoading(true);

            try {
                const [
                    placasJson,
                    mesesJson,
                    diasJson,
                    anosJson,
                    marcaJson
                ] =
                    await Promise.all([
                        fetchData(consultaPlacas, { anos, meses, dias, marcas }),
                        fetchData('obterMeses', { anos, placas, dias, marcas }),
                        fetchData('obterDias', { anos, placas, meses, marcas }),
                        fetchData('obterAnos', { dias, placas, meses, marcas }),
                        fetchData('obterMarca', { dias, placas, meses, anos }),
                    ]);


                setPlacaList(placasJson);
                setMesesList(mesesJson);
                setDiasList(diasJson);
                setAnosList(anosJson);
                setMarcasList(marcaJson);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (url) fetchAllData();
    }, [
        anos,
        placas,
        meses,
        filial,
        url,
        marcas,
        consultaPlacas,
        dias
    ]);


    return (
        <section style={{ display: isHidden ? 'none' : 'block' }}>
            <div className='listaFiltro animeLeft'>
                <form className='filters' style={{ fontFamily: 'sans-serif', fontSize: 14 }}>
                    <div className='containerFilters'>
                        <FiltroIndividual options={placaList} isLoading={loading} isDisabled={!placaList} onChange={handleFilterChange(setPlacas)} placeholder="Placa" />
                        <FiltroIndividual options={marcasList} isLoading={loading} isDisabled={!marcasList} onChange={handleFilterChange(setMarcas)} placeholder="Marca" />
                        <FiltroIndividual options={anosList} isLoading={loading} isDisabled={!anosList} onChange={handleFilterChange(setAnos)} placeholder="Ano" />
                        <FiltroIndividual options={mesesList} isLoading={loading} isDisabled={!mesesList} onChange={handleFilterChange(setMeses)} placeholder="Mês" />
                        <FiltroIndividual options={diasList} isLoading={loading} isDisabled={!diasList} onChange={handleFilterChange(setDias)} placeholder="Dia" />
                    </div>


                </form>
            </div>
        </section>
    );
};

export default Filter;
