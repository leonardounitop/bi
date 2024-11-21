import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const FilterMultasContext = createContext();

const FilterMultasProvider = ({ children }) => {

    const [placas, setPlacas] = useState(null);
    const [mes, setMes] = useState(null);
    const [ano, setAno] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <FilterMultasContext.Provider value={{ placas, setPlacas, mes, setMes, loading, ano, setAno, setLoading }}>
            {children}
        </FilterMultasContext.Provider>
    );
};

export default FilterMultasProvider;
