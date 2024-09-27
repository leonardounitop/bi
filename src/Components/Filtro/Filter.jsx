import React, { useContext, useEffect, useState } from 'react';
import FiltroIndividual from './FiltroIndividual'; // Importando o componente FiltroIndividual
import { FilterContext } from '../../Context/FilterVault';
import { useLocation } from 'react-router-dom';

const Filter = () => {
    const [loading, setLoading] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const { pathname } = useLocation();
    const contextFilter = useContext(FilterContext);
    const {
        anos,
        setAnos,
        placas,
        setPlacas,
        meses,
        setMeses,
        filial,
        setFilial,
        tipoVeiculo,
        setTipoVeiculo,
        departamento,
        setDepartamento,
        base,
        setBase,
        categoria,
        setCategoria,
        combustivel,
        setCombustivel,
        url,
        fetchData
    } = contextFilter;


    const [placaList, setPlacaList] = useState(null);
    const [filiaisList, setFiliaisList] = useState(null);
    const [anosList, setAnosList] = useState(null);
    const [mesesList, setMesesList] = useState(null);
    const [tipoList, setTipoList] = useState(null);
    const [departamentoList, setDepartamentoList] = useState(null);
    const [baseList, setBaseList] = useState(null);
    const [categoriaList, setCategoriaList] = useState(null);
    const [combustivelList, setCombustivelList] = useState(null);

    // Função Genérica para setar o que ira no fetch.
    const handleFilterChange = (setFunction) => (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setFunction(values.length > 0 ? values : null);
    };

    // Desabilitar o filtro em páginas que não precisam
    useEffect(() => {
        if (
            pathname.includes('coleta')
            || pathname.includes('media')
            || pathname.includes('comparativo')
            || pathname.includes('premio')
        ) {
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
                    filiaisJson,
                    anosJson,
                    mesesJson,
                    tipoJson,
                    departamentoJson,
                    baseJson,
                    categoriaJson,
                    combustivelJson
                ] =
                    await Promise.all([
                        fetchData('obterPlacas', { anos, meses, filial, tipoVeiculo, departamento, base, categoria, combustivel }),
                        fetchData('obterFiliais', { placas, anos, meses, tipoVeiculo, departamento, base, categoria, combustivel }),
                        fetchData('obterAnos', { placas, meses, filial, tipoVeiculo, departamento, base, categoria, combustivel }),
                        fetchData('obterMeses', { anos, placas, filial, tipoVeiculo, departamento, base, categoria, combustivel }),
                        fetchData('obterTipo', { anos, placas, meses, filial, departamento, base, categoria, combustivel }),
                        fetchData('obterDepartamento', { anos, placas, meses, filial, tipoVeiculo, base, categoria, combustivel }),
                        fetchData('obterBase', { anos, placas, meses, departamento, filial, tipoVeiculo, categoria, combustivel }),
                        fetchData('obterCategoria', { anos, placas, meses, filial, tipoVeiculo, departamento, base, combustivel }),
                        fetchData('obterCombustivel', { anos, placas, meses, filial, tipoVeiculo, departamento, base, categoria })
                    ]);



                setPlacaList(placasJson);
                setFiliaisList(filiaisJson);
                setAnosList(anosJson);
                setMesesList(mesesJson);
                setTipoList(tipoJson);
                setDepartamentoList(departamentoJson);
                setBaseList(baseJson);
                setCategoriaList(categoriaJson);
                setCombustivelList(combustivelJson);

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
        tipoVeiculo,
        departamento,
        base,
        categoria,
        combustivel,
        url
    ]);


    return (
        <section style={{ display: isHidden ? 'none' : 'block' }}>
            <div className='listaFiltro animeLeft'>
                <form className='filters' style={{ fontFamily: 'sans-serif', fontSize: 14 }}>
                    <div className='containerFilters'>
                        <FiltroIndividual options={placaList} isLoading={loading} isDisabled={!placaList} onChange={handleFilterChange(setPlacas)} placeholder="Placas" />
                        <FiltroIndividual options={filiaisList} isLoading={loading} isDisabled={!filiaisList} onChange={handleFilterChange(setFilial)} placeholder="Filial" />
                        <FiltroIndividual options={anosList} isLoading={loading} isDisabled={!anosList} onChange={handleFilterChange(setAnos)} placeholder="Ano" />
                        <FiltroIndividual options={mesesList} isLoading={loading} isDisabled={!mesesList} onChange={handleFilterChange(setMeses)} placeholder="Meses" />
                        <FiltroIndividual options={tipoList} isLoading={loading} isDisabled={!tipoList} onChange={handleFilterChange(setTipoVeiculo)} placeholder="Tipo" />
                        <FiltroIndividual options={departamentoList} isLoading={loading} isDisabled={!departamentoList} onChange={handleFilterChange(setDepartamento)} placeholder="Departamento" />
                        <FiltroIndividual options={baseList} isLoading={loading} isDisabled={!baseList} onChange={handleFilterChange(setBase)} placeholder="Base" />
                        <FiltroIndividual options={categoriaList} isLoading={loading} isDisabled={!categoriaList} onChange={handleFilterChange(setCategoria)} placeholder="Categoria" />
                        <FiltroIndividual options={combustivelList} isLoading={loading} isDisabled={!combustivelList} onChange={handleFilterChange(setCombustivel)} placeholder="Combustivel" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Filter;
