import React, { useCallback, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Circle,
  InfoWindow,
} from '@react-google-maps/api';
import { Box, position, Text } from '@chakra-ui/react';
import { PieDoug } from '@components/common/charts/piecharts';

const regionsCoordinates = {
  Dakar: { lat: 14.6928, lng: -17.4467 },
  Thiès: { lat: 14.8059, lng: -16.9241 },
  'Saint-Louis': { lat: 16.0179, lng: -16.4896 },
  Kaolack: { lat: 14.1511, lng: -16.0726 },
  Fatick: { lat: 14.3388, lng: -16.4169 },
  Ziguinchor: { lat: 12.5684, lng: -16.273 },
  Louga: { lat: 15.6103, lng: -16.2362 },
  Diourbel: { lat: 14.6601, lng: -16.2363 },
  Matam: { lat: 15.6594, lng: -13.2554 },
  Kaffrine: { lat: 14.1053, lng: -15.5506 },
  Kolda: { lat: 12.8833, lng: -14.9504 },
  Sédhiou: { lat: 12.7087, lng: -15.556 },
  Tambacounda: { lat: 13.7708, lng: -13.6673 },
  Kédougou: { lat: 12.5556, lng: -12.1806 },
};

const programmeData = [
  {
    region: 'Dakar',
    programmes: 120,
    projects: 45,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  {
    region: 'Thiès',
    programmes: 85,
    projects: 30,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [50, 50] },
  },
  {
    region: 'Saint-Louis',
    programmes: 60,
    projects: 25,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  {
    region: 'Kaolack',
    programmes: 75,
    projects: 20,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  {
    region: 'Fatick',
    programmes: 50,
    projects: 15,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  {
    region: 'Ziguinchor',
    programmes: 65,
    projects: 18,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  { region: 'Louga', programmes: 40, projects: 12, consumptionRate: '54%' },
  {
    region: 'Diourbel',
    programmes: 55,
    projects: 16,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  {
    region: 'Matam',
    programmes: 35,
    projects: 10,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  {
    region: 'Kaffrine',
    programmes: 20,
    projects: 7,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  {
    region: 'Kolda',
    programmes: 45,
    projects: 14,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  { region: 'Sédhiou', programmes: 30, projects: 9, consumptionRate: '50%' },
  {
    region: 'Tambacounda',
    programmes: 25,
    projects: 8,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
  {
    region: 'Kédougou',
    programmes: 15,
    projects: 5,
    consumptionRate: '60%',
    chartData: { labels: ['Taux conso.', 'Taux restant'], values: [40, 20] },
  },
];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = { lat: 14.4974, lng: -14.4524 }; // Center of Senegal

export const SenegalGoogleMap = () => {
  const [activeRegion, setActiveRegion] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    Object.values(regionsCoordinates).forEach((coords) =>
      bounds.extend(coords)
    );
    map.fitBounds(bounds);
  }, []);

  const handleCircleClick = (region, position) => {
    setActiveRegion({ region, position });
  };

  return (
    <>
      <Text mb={2.5} p={2} fontWeight="600" fontSize={14}>
        Répartition par région
      </Text>
      <LoadScript googleMapsApiKey="AIzaSyAZ-Z8vBocPWRW4ikkFKWJgbXHO6pGmCvU">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          onLoad={onLoad}
          center={center}
          zoom={6}
        >
          {programmeData.map((programme, index) => {
            const position = regionsCoordinates[programme.region];
            return (
              <Circle
                key={index}
                center={position}
                radius={programme.programmes * 100} // Scale as needed
                options={{
                  strokeColor: 'blue',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: 'blue',
                  fillOpacity: 0.35,
                }}
                onClick={() => handleCircleClick(programme, position)}
              />
            );
          })}
          {activeRegion && (
            <InfoWindow
              position={activeRegion.position}
              onCloseClick={() => setActiveRegion(null)}
            >
              <div>
                <strong>{activeRegion.region.region}</strong>
                <br />
                Programmes: {activeRegion.region.programmes}
                <br />
                Nombre de projets: {activeRegion.region.projects}
                <br />
                Budget consommé: {activeRegion.region.consumptionRate}
                <Box width="200px" height="200px" mt={2}>
                  <PieDoug data={activeRegion.region.chartData} />
                </Box>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};
