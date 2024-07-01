import React from 'react'

import { ResponsivePie } from '@nivo/pie';
import { currency } from '../Helper/NumberFormatter';

function Pie({ data, dataType, padAngle, innerRadius }) {
    return (
        <ResponsivePie
            valueFormat={value => {

                if (dataType === 'currency') {
                    return `${currency.format(value)}`;
                } else if (dataType === 'volume') {
                    return `${value} km/l`;
                }

                return value;
            }}

            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={innerRadius}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            data={data}
            padAngle={padAngle ? padAngle : 1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsColor={{ from: 'color' }}
            arcLinkLabelsOffset={1}
            arcLinkLabelsStraightLength={5}
            arcLabelsSkipAngle={10}
            arcLinkLabelsSkipAngle={10}
            colors={{ scheme: 'nivo' }}
        // legends={[
        //     {
        //         anchor: 'right',
        //         direction: 'column',
        //         justify: true,
        //         itemWidth: 80,
        //         itemHeight: 35,
        //         itemTextColor: '#999',
        //         itemDirection: 'bottom-to-top',
        //         itemOpacity: 1,
        //         symbolSize: 6,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#000'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
        />

    )
}

export default Pie