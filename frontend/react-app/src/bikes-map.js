import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import bikeIconUrl from './Graphic/bike2.png';

const bikeIcon = new L.Icon({
  iconUrl: bikeIconUrl,
  iconRetinaUrl: bikeIconUrl,
  iconAnchor: [17, 34],
  popupAnchor: [1, -34],
});

export default function BikeMap() {
  const [stations, setStations] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch('https://effective-space-enigma-x6j49v465773675r-3001.app.github.dev/bikes_all')
      .then(response => response.json())
      .then(data => {
        if (data.AllBikeStations) {
          setStations(data.AllBikeStations);
        }
      })
      .catch(error => console.error("Erreur lors de la récupération des données des stations de vélo :", error));
  }, []);

  useEffect(() => {
    // Invalidate size after a short delay
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 100);
  }, []);

  return (
    <MapContainer 
      center={[43.610769, 3.876716]} 
      zoom={14} 
      style={{ height: '100vh', width: '100%' }}
      whenCreated={mapInstance => { mapRef.current = mapInstance; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map(station => (
        <Marker
          position={[station.location.value.coordinates[1], station.location.value.coordinates[0]]}
          key={station.id}
          icon={bikeIcon}
        >
          <Popup>
            <b>{station.address.value.streetAddress}</b><br />
            Available Bikes: {station.availableBikeNumber.value}<br />
            Free Slots: {station.freeSlotNumber.value}<br />
            <a href={`https://effective-space-enigma-x6j49v465773675r-3000.app.github.dev/?station=${station.id}`}>Open station</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}