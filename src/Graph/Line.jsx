import { ResponsiveLine } from '@nivo/line';
import { currency } from '../Helper/NumberFormatter';

const Line = ({ data, dataType, legend, telemetria }) => {
    const allYValues = data.flatMap(series => series.data.map(d => d.y >= 0 && !isNaN(d.y) ? d.y : 0));
    const minValue = Math.min(...allYValues);

    const corTelemetria = ['#4ade80', '#60a5fa', '#fde047', '#f87171', '#a1a1aa'];

    const theme = {
        axis: {
            ticks: {
                text: {
                    fontSize: 11, // Alterar tamanho da fonte dos rótulos dos ticks dos eixos
                },
            },
            legend: {
                text: {
                    fontSize: 14, // Ajustar o tamanho da fonte da legenda do eixo
                },
            },
        },
        labels: {
            text: {
                fontSize: 11, // Alterar tamanho da fonte dos rótulos das barras
            },
        },
        legends: {
            text: {
                fontSize: 14, // Ajuste o tamanho da fonte da legenda geral conforme necessário
            },
        },
    };

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 35, right: 120, bottom: 50, left: 75 }} // Ajuste o 'top' para dar espaço para a legenda
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
                legendPosition: 'middle',
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 10,
                tickPadding: 25,
                tickRotation: 0,
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={telemetria ? corTelemetria : { scheme: 'dark2' }}
            pointSize={8}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-10}
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
                    anchor: 'top-right', // Mova a legenda para o topo
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: -20, // Ajuste Y para subir a legenda
                    itemsSpacing: 2,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 14,
                    itemOpacity: 0.75,
                    symbolSize: 8,
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
    );
};

export default Line;
