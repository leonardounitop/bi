import { ResponsiveLine } from '@nivo/line';


//   { data /* see data tab */ }
const Line = ({ data, dataType, legend, telemetria }) => {

    const allYValues = data.flatMap(series => series.data.map(d => d.y >= 0 && !isNaN(d.y) ? d.y : 0));
    const minValue = Math.min(...allYValues);

    // const corTelemetria = ['#4ade80', '#fde047', '#60a5fa', '#f87171', '#a1a1aa'];

    // Nao está claro como as cores estao se relacionando com as linhas, coloquei nessa ordem e deu certo. Verificar no futuro.
    const corTelemetria = ['#4ade80', '#60a5fa', '#fde047', '#f87171', '#a1a1aa'];

    const theme = {
        axis: {
            ticks: {
                text: {
                    fontSize: 11, // Alterar tamanho da fonte dos rótulos dos eixos
                },
            },
        },
        labels: {
            text: {
                fontSize: 11, // Alterar tamanho da fonte dos rótulos das barras
            },
        },
    };


    return <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 120, bottom: 50, left: 55 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: minValue
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: legend,
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
        colors={telemetria ? corTelemetria : { scheme: 'dark2' }}
        pointSize={8}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableGridX={true}
        yFormat={(value) => {
            if (dataType === 'currency') {
                return `${currency.format(value)}`;
            } else if (dataType === 'volume') {
                return `${value}km/l`;
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
                translateY: 10,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 16,
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

        theme={theme}

    />
}

export default Line;