import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import { format } from 'date-fns';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import caminhaoIcon from '../../assets/caminhaoGrande.png';

// Definindo o ícone personalizado
const customIcon = L.icon({
    iconUrl: caminhaoIcon, // Caminho para o ícone personalizado
    iconSize: [80, 80], // Tamanho do ícone
    popupAnchor: [1, -34], // Ponto de ancoragem do popup em relação ao ícone
    shadowSize: [41, 41] // Tamanho da sombra
});

const { BaseLayer } = LayersControl;

const convertToGeoJSON = (dados) => {
    return {
        type: "FeatureCollection",
        features: dados.map(point => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [point.longitude, point.latitude]
            },
            properties: {
                placa: point.placa,
                velocidade: point.velocidade,
                tecnologia: point.tecnologia,
                duracao: point.duracao,
                dataposicao: format(point.dataposicao, 'dd/MM/yyyy hh:mm:ss'),
                evento: point.evento
            }
        }))
    };
};

const LeafletMap = ({ dados }) => {
    const mapRef = useRef(null);

    const markerClusterRef = useRef(L.markerClusterGroup({
        zoomToBoundsOnClick: true,
        chunkedLoading: true,
        chunkDelay: 50,
        removeOutsideVisibleBounds: true, // Remove marcadores fora dos limites visíveis
    }));

    const dadosGeoJson = dados ? convertToGeoJSON(dados) : null;

    useEffect(() => {
        if (mapRef.current && !mapRef.current.hasLayer(markerClusterRef.current)) {
            mapRef.current.addLayer(markerClusterRef.current);
        }
    }, [mapRef.current]);


    useEffect(() => {
        if (markerClusterRef.current) {
            markerClusterRef.current.clearLayers(); // Limpa os marcadores existentes

            if (dadosGeoJson) {
                const geoJsonLayer = L.geoJson(dadosGeoJson, {
                    onEachFeature: (feature, layer) => {
                        layer.bindPopup(`
                            Placa: ${feature.properties.placa}<br />
                            Velocidade: ${feature.properties.velocidade || 0} km/h <br />
                            Latitude: ${feature.geometry.coordinates[1]} <br />
                            Longitude: ${feature.geometry.coordinates[0]} <br />
                            Equipamento: ${feature.properties.tecnologia} <br />
                            Duração: ${feature.properties.duracao || '00:00:00'} <br />
                            Data: ${feature.properties.dataposicao} <br />
                            Evento: ${feature.properties.evento}
                        `);
                    },
                    pointToLayer: (feature, latlng) => L.marker(latlng, { icon: customIcon })
                });

                markerClusterRef.current.addLayer(geoJsonLayer);
            }
        }
    }, [dadosGeoJson]);



    return (
        <div className="map-container">
            <MapContainer
                center={[-13.007290, -55.156745]}
                zoom={5}
                maxZoom={18}
                className="leaflet-map"
                whenReady={(mapInstance) => {
                    mapRef.current = mapInstance.target;
                    mapInstance.target.addLayer(markerClusterRef.current);
                }}
            >
                <LayersControl position="topright"  >
                    <BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                    </BaseLayer>
                    <BaseLayer name="Google">
                        <TileLayer
                            url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                            attribution="&copy; Google"
                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                            maxZoom={20}
                        />
                    </BaseLayer>
                </LayersControl>
            </MapContainer>
        </div>
    );
};

export default React.memo(LeafletMap);
