import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import 'leaflet.markercluster';

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
                duracao_evento: point.duracao_evento,
                data_evento: point.data_evento,
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
    }));

    const dadosGeoJson = dados ? convertToGeoJSON(dados) : null;

    useEffect(() => {
        if (mapRef.current && !mapRef.current.hasLayer(markerClusterRef.current)) {
            mapRef.current.addLayer(markerClusterRef.current);
        }
    }, [mapRef.current]);

    useEffect(() => {
        if (markerClusterRef.current) {
            const markerClusterGroup = markerClusterRef.current;
            markerClusterGroup.clearLayers(); // Limpa os marcadores existentes

            // Adiciona dados GeoJSON ao MarkerClusterGroup
            const geoJsonLayer = L.geoJson(dadosGeoJson, {
                onEachFeature: (feature, layer) => {
                    layer.bindPopup(`
                        Placa: ${feature.properties.placa}<br />
                        Velocidade: ${feature.properties.velocidade ? feature.properties.velocidade : 0} km/h <br />
                        Latitude: ${feature.geometry.coordinates[1]} <br />
                        Longitude: ${feature.geometry.coordinates[0]} <br />
                        Equipamento: ${feature.properties.tecnologia} <br />
                        Duração: ${feature.properties.duracao_evento ? feature.properties.duracao_evento : '00:00:00'} <br />
                        Data: ${feature.properties.data_evento} <br />
                        Evento: ${feature.properties.evento}
                    `);
                },
                pointToLayer: (feature, latlng) => {
                    return L.marker(latlng);
                }
            });

            markerClusterGroup.addLayer(geoJsonLayer);
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
