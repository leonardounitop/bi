import React from 'react';
import Select from 'react-select';

const FiltroIndividual = ({ options, isLoading, isDisabled, onChange, placeholder }) => {
    return (
        <div>
            <Select
                isDisabled={isDisabled || !options}
                isMulti
                options={options ? options : []}
                menuPlacement='top'
                onChange={onChange}
                placeholder={placeholder}
                className='select'
                isLoading={isLoading}
            />
        </div>
    );
};

export default FiltroIndividual;
