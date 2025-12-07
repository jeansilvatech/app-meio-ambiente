import React, { useEffect, useMemo, useState } from 'react';
import L, { Map } from 'leaflet'; 
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 

// Importe seu ícone customizado AQUI
import iconFireUrl from '../../public/fire-icon.png'; 
import { FocoQueimada } from '@/app/api/queimadas/route';

// Defina a Interface do Foco, MapResizer, etc. aqui.
// ... (seu MapResizer usando useMap() vai aqui) ...

const fireIcon = L.icon({
    // Lógica do ícone usando iconFireUrl.src se estiver no Next.js
    iconUrl: iconFireUrl.src as string, 
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32]
});
interface MapResizerProps {
    open: boolean;
}
interface MapContentProps {
    selectedFoco: FocoQueimada; // Assumimos que o foco NUNCA será null aqui, pois você deve checar antes de renderizar
    open: boolean;
}
const MapResizer: React.FC<MapResizerProps> = ({ open }) => {
    // useMap só pode ser chamado DENTRO de MapContainer
    const map: Map = useMap(); 
    
    useEffect(() => {
        if (open) {
            // Pequeno atraso para garantir que o Modal já está visível
            const timer = setTimeout(() => {
                map.invalidateSize();
            }, 50); 

            return () => clearTimeout(timer);
        }
    }, [open, map]);

    return null; 
};
const MapContent = ({ selectedFoco, open }:MapContentProps) => {
    // ... useEffect para a correção global de ícone (se necessário)

    return (
        <MapContainer 
            center={[selectedFoco.lat, selectedFoco.lon]} 
            zoom={6}
            style={{ height: '500px', width: '100%' }}
        >
            {/* MapResizer e todo o resto do mapa */}
            <MapResizer open={open} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='...'/>
            <Marker position={[selectedFoco.lat, selectedFoco.lon]} icon={fireIcon}>
                <Popup>{selectedFoco.municipio}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapContent;