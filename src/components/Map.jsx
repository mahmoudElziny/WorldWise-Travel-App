import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

export default function Map() {

    const { cities } = useCities();

    const [mapPosition, setMapPosition] = useState([40, 0]);

    const [searchParams] = useSearchParams();

    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    return (
        <div className={styles.mapContainer} >
            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div >
    )
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {

    const navigate = useNavigate();

    useMapEvents({
        click: () => navigate(`form`),
    });
}