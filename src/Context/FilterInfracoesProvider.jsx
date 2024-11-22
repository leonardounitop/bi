import React, { createContext, useState } from 'react';

export const FilterInfracoesContext = createContext();

const FilterInfracoesProvider = ({ children }) => {

    const [placas, setPlacas] = useState(null);
    const [marca, setMarca] = useState(null);
    const [mes, setMes] = useState(null);
    const [ano, setAno] = useState(null);
    const [dia, setDia] = useState(null);
    const [loading, setLoading] = useState(false);

    const filterFetchs = {
        anos: ano,
        meses: mes,
        dias: dia,
        placas,
        marcas: marca,
    };

    return (
        <FilterInfracoesContext.Provider value={{ placas, setPlacas, mes, setMes, marca, setMarca, dia, setDia, ano, setAno, loading, setLoading, filterFetchs }}>
            {children}
        </FilterInfracoesContext.Provider>
    );
};

export default FilterInfracoesProvider;
