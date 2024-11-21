import React, { useContext, useEffect, useState } from 'react';
import FiltroIndividual from './FiltroIndividual';
import { FilterTelemetriaContext } from '../../Context/FilterTelemetriaProvider';
import { FilterInfracoesContext } from '../../Context/FilterInfracoesProvider';

const FilterInfracoes = () => {
    const [loading, setLoading] = useState(false);

    const {
        url,
        fetchData
    } = useContext(FilterTelemetriaContext);


    const { placas, setPlacas, mes, setMes, marca, setMarca, dia, setDia, ano, setAno, } = useContext(FilterInfracoesContext);

    const [placaList, setPlacaList] = useState(null);
    const [marcaList, setMarcaList] = useState(null);
    const [anosList, setAnosList] = useState(null);
    const [mesesList, setMesesList] = useState(null);
    const [diasList, setDiasList] = useState(null);






    // Função Genérica para setar o que ira no fetch.
    const handleFilterChange = (setFunction) => (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setFunction(values.length > 0 ? values : null);
    };


    const isValidData = (data) => {
        if (data && Array.isArray(data) && data.length) return true;
        return false;
    }

    // Fetch dos dados do Filtro
    useEffect(() => {

        const fetchAllData = async () => {
            setLoading(true);




            try {
                const [
                    jsonPlacas,
                    jsonMarcas,
                    jsonAnos,
                    jsonMeses,
                    jsonDias
                ] =
                    await Promise.all([
                        fetchData('obterPlacasInfracoes', { meses: mes, marcas: marca, dias: dia, anos: ano }),
                        fetchData('obterMarcaInfracoes', { placas, meses: mes, dias: dia, anos: ano }),
                        fetchData('obterAnosInfracoes', { placas, meses: mes, marcas: marca, dias: dia }),
                        fetchData('obterMesesInfracoes', { placas, marcas: marca, dias: dia, anos: ano }),
                        fetchData('obterDiasInfracoes', { placas, meses: mes, marcas: marca, anos: ano }),

                    ]);

                console.log(jsonPlacas);



                if (isValidData(jsonPlacas)) {
                    setPlacaList(jsonPlacas);
                }

                if (isValidData(jsonMarcas)) {
                    setMarcaList(jsonMarcas)
                }

                if (isValidData(jsonAnos)) {
                    setAnosList(jsonAnos);
                }

                if (isValidData(jsonMeses)) {
                    setMesesList(jsonMeses);
                }

                if (isValidData(jsonDias)) {
                    setDiasList(jsonDias);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (url) fetchAllData();
    }, [
        url, placas, mes, marca, dia, ano
    ]);


    return (
        <section >
            <div className='listaFiltro animeLeft'>
                <form className='filters' style={{ fontFamily: 'sans-serif', fontSize: 14 }}>
                    <div className='containerFilters'>
                        <FiltroIndividual options={placaList} isLoading={loading} isDisabled={!placaList} onChange={handleFilterChange(setPlacas)} placeholder="Placa" />
                        <FiltroIndividual options={marcaList} isLoading={loading} isDisabled={!marcaList} onChange={handleFilterChange(setMarca)} placeholder="Marca" />
                        <FiltroIndividual options={anosList} isLoading={loading} isDisabled={!anosList} onChange={handleFilterChange(setAno)} placeholder="Ano" />
                        <FiltroIndividual options={mesesList} isLoading={loading} isDisabled={!mesesList} onChange={handleFilterChange(setMes)} placeholder="Mês" />
                        <FiltroIndividual options={diasList} isLoading={loading} isDisabled={!diasList} onChange={handleFilterChange(setDia)} placeholder="Dia" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default FilterInfracoes;
