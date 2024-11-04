import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL_ABASTECIMENTO, API_URL_TELEMETRIA } from '../Api';

export const FilterTelemetriaContext = createContext();

const FilterVault = ({ children }) => {
    const [anos, setAnos] = useState(null);
    const [meses, setMeses] = useState(null);
    const [dias, setDias] = useState(null);
    const [placas, setPlacas] = useState(null);
    const [marcas, setMarcas] = useState(null);


    const [url, setUrl] = useState(null);
    const { pathname } = useLocation();

    const filterFetchs = {
        anos,
        meses,
        dias,
        placas,
        marcas,
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

        // Arrumar essa parte que seta a URL

        if (pathname.includes('abastecimento')) {
            setUrl(API_URL_ABASTECIMENTO);
        } else if (pathname.includes('telemetria')) {
            setUrl(API_URL_TELEMETRIA);
        } else {
            setUrl(API_URL_TELEMETRIA);
        }


    }, [pathname]);

    return (
        <FilterTelemetriaContext.Provider value={{
            anos,
            setAnos,
            meses,
            setMeses,
            dias,
            setDias,
            marcas, setMarcas,
            placas,
            setPlacas,
            url,
            fetchData,
            filterFetchs
        }}>
            {children}
        </FilterTelemetriaContext.Provider>
    );
};

export default FilterVault;
