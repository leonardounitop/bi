import React from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { currency } from '../Helper/NumberFormatter';


function Bar({ data, dataType, layout, keys, indexBy, groupMode, margin, telemetria = false }) {


    const corTelemetria = ['#4ade80', '#fde047', '#60a5fa', '#f87171', '#a1a1aa'];
    return (
        <ResponsiveBar
            data={data}
            layout={layout ? layout : 'vertical'}
            padding={0.1}
            valueFormat={(value) => {


                if (dataType === 'currency') {
                    return `${currency.format(value)}`;
                } else if (dataType === 'volume') {
                    return `${value} km/l`;
                } else if (dataType === 'percent') {
                    return `${value}%`
                }

                return value;
            }}
            activeOuterRadiusOffset={8}
            keys={keys}
            indexBy={indexBy}
            groupMode={groupMode ? groupMode : 'stacked'}
            margin={margin}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={telemetria ? corTelemetria : { scheme: 'set2' }}
            role="application"
            labelSkipWidth={10}
        />
    )
}

export default Bar