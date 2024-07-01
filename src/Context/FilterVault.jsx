import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL_ABASTECIMENTO, API_URL_TELEMETRIA } from '../Api';

export const FilterContext = createContext();

const FilterVault = ({ children }) => {
    const [anos, setAnos] = useState(null);
    const [meses, setMeses] = useState(null);
    const [dias, setDias] = useState(null);
    const [placas, setPlacas] = useState(null);
    const [filial, setFilial] = useState(null);
    const [tipoVeiculo, setTipoVeiculo] = useState(null);
    const [departamento, setDepartamento] = useState(null);
    const [base, setBase] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [combustivel, setCombustivel] = useState(null);

    const [url, setUrl] = useState(null);
    const { pathname } = useLocation();

    const filterFetchs = {
        placas,
        filial,
        anos,
        meses,
        tipoVeiculo,
        departamento,
        base,
        categoria,
        combustivel
    };


    const fetchData = async (tipoConsulta, body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ tipoConsulta, ...body })
        });

        return response.json();
    };



    // setar o URL da API
    useEffect(() => {

        if (pathname.includes('abastecimento')) {
            setUrl(API_URL_ABASTECIMENTO);
        } else if (pathname.includes('telemetria')) {
            setUrl(API_URL_TELEMETRIA);
        }


    }, [pathname]);

    return (
        <FilterContext.Provider value={{
            anos, setAnos,
            meses, setMeses,
            dias, setDias,
            placas, setPlacas,
            filial, setFilial,
            tipoVeiculo, setTipoVeiculo,
            departamento, setDepartamento,
            base, setBase,
            categoria, setCategoria,
            combustivel, setCombustivel,
            url, fetchData,
            filterFetchs
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterVault;
