import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTooltip, BasicTooltip } from '@nivo/tooltip';
import { animated, to } from '@react-spring/web';
import { currency } from '../Helper/NumberFormatter';

const CustomBarComponent = ({ bar: { data, ...bar }, style, formatValue }) => {
    const { x, y, width, height, color } = bar;
    const { showTooltipFromEvent, hideTooltip } = useTooltip();
    const value = data.value;
    const id = data.id;
    const formattedValue = formatValue(value);
    const valueWidth = formattedValue.length * 6; // Aproximando largura do valor



    return (
        <animated.g transform={style.transform}>
            <animated.rect
                x={0}
                y={0}
                width={to(style.width, (value) => Math.max(value, 0))}
                height={to(style.height, (value) => Math.max(value, 0))}
                fill={color}
                onMouseEnter={(event) => showTooltipFromEvent(
                    <BasicTooltip
                        id={id}
                        value={formattedValue}
                        enableChip={true}
                        color={color}
                    />,
                    event
                )}
                onMouseMove={(event) => showTooltipFromEvent(
                    <BasicTooltip
                        id={id}
                        value={formattedValue}
                        enableChip={true}
                        color={color}
                    />,
                    event
                )}
                onMouseLeave={hideTooltip}
            />
            {valueWidth > width ? (
                <animated.text
                    x={to(style.width, (value) => value + 5)}
                    y={to(style.height, (value) => value / 2)}
                    textAnchor="start"
                    dominantBaseline="central"
                    style={{ fill: '#333', fontSize: 12, fontFamily: 'sans-serif' }}
                >
                    {formattedValue}
                </animated.text>
            ) : (
                <animated.text
                    x={to(style.width, (value) => value / 2)}
                    y={to(style.height, (value) => value / 2)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fill: '#333', fontSize: 12, fontFamily: 'sans-serif' }}
                >
                    {formattedValue}
                </animated.text>
            )}
        </animated.g>
    );
};

function Bar({ data, dataType, layout, keys, indexBy, groupMode, margin, telemetria = false, customBarWidth = false }) {
    const corTelemetria = ['#4ade80', '#fde047', '#60a5fa', '#f87171', '#a1a1aa'];

    const formatValue = (value) => {
        if (dataType === 'currency') {
            return `${currency.format(value)}`;
        } else if (dataType === 'volume') {
            return `${value}km/l`;
        } else if (dataType === 'percent') {
            return `${value}%`;
        }
        return value;
    };

    const CustomBarComponentWithTooltip = (props) => {
        return <CustomBarComponent {...props} formatValue={formatValue} />;
    };

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

    return (
        <ResponsiveBar
            data={data}
            layout={layout ? layout : 'vertical'}
            padding={0.1}
            valueFormat={formatValue}
            activeOuterRadiusOffset={8}
            keys={keys}
            indexBy={indexBy}
            groupMode={groupMode ? groupMode : 'stacked'}
            margin={margin}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={telemetria ? corTelemetria : { scheme: 'set2' }}
            role="application"
            barComponent={customBarWidth ? CustomBarComponentWithTooltip : undefined}
            animate={true} // Habilitar animação
            motionStiffness={90} // Ajustar rigidez da animação
            motionDamping={15} // Ajustar amortecimento da animação
            theme={theme}
        />
    );
}

export default Bar;
