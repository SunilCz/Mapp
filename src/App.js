import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import './Map.css'; // Import your CSS file for styling

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iaW4tZGV2a290YSIsImEiOiJjbHBmNDVvd3YxaTJ3MmpwZGxndzNudGE3In0.OSon9cSO6JX4io1wDqcZIQ';

const Map = () => {
  const [map, setMap] = useState();
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.662323, 45.523751],
        zoom: 12,
      });

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving-traffic',
      });

      newMap.addControl(directions, 'top-left');

      setMap(newMap);
    };

    if (!map) initializeMap({ setMap, mapContainer: mapContainerRef });
  }, [map]);

  return (
    <div className="map-wrapper">
      <div ref={(el) => (mapContainerRef.current = el)} className="mapContainer" />
    </div>
  );
};

export default Map;
