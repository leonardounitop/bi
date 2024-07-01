import React from 'react'
import { Oval } from 'react-loader-spinner';


function LoadingSpinner({ width = 16, height = 16 }) {
    return (
        <Oval width={width} height={height} color="#1e3a8a" secondaryColor='#bfdbfe' />
    )
}

export default LoadingSpinner