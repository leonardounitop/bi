import { ResponsiveLine } from '@nivo/line';


//   { data /* see data tab */ }
const Line = ({ data, dataType }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Produtividade Mensal',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 25,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'set3' }}
        pointSize={8}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableGridX={true}
        yFormat={(value) => {
            if (dataType === 'currency') {
                return `${currency.format(value)}`;
            } else if (dataType === 'volume') {
                return `${value} km/l`;
            } else if (dataType === 'percent') {
                return `${value}%`
            }
            return value;
        }}
        enablePointLabel={true}
        enableGridY={true}
        useMesh={true}
        enableSlices="x"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}

    />
)

export default Line;