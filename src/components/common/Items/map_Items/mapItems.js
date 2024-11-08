"use client";
import {
  Circle,
  MapContainer,
  Pane,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { PieDoug } from '@components/common/charts/piecharts';

const outer = [
  [12.0, -17.5], // southwest corner
  [16.5, -12.0], // northeast corner
];

const inner = [
  [13.5, -16.0], // southwest corner
  [15.0, -14.5], // northeast corner
];

export const SenegalMap = () => {
  /* const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined'); 
  }, []); */

  const regionsCoordinates = {
    Dakar: [14.6928, -17.4467],
    Thiès: [14.8059, -16.9241],
    'Saint-Louis': [16.0179, -16.4896],
    Kaolack: [14.1511, -16.0726],
    Fatick: [14.3388, -16.4169],
    Ziguinchor: [12.5684, -16.273],
    Louga: [15.6103, -16.2362],
    Diourbel: [14.6601, -16.2363],
    Matam: [15.6594, -13.2554],
    Kaffrine: [14.1053, -15.5506],
    Kolda: [12.8833, -14.9504],
    Sédhiou: [12.7087, -15.556],
    Tambacounda: [13.7708, -13.6673],
    Kédougou: [12.5556, -12.1806],
  };

  const programmeData = [
    {
      region: 'Dakar',
      programmes: 120,
      projects: 45,
      consumptionRate: '85%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    {
      region: 'Thiès',
      programmes: 85,
      projects: 30,
      consumptionRate: '78%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [50, 50] },
    },
    {
      region: 'Saint-Louis',
      programmes: 60,
      projects: 25,
      consumptionRate: '66%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    {
      region: 'Kaolack',
      programmes: 75,
      projects: 20,
      consumptionRate: '70%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    {
      region: 'Fatick',
      programmes: 50,
      projects: 15,
      consumptionRate: '60%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    {
      region: 'Ziguinchor',
      programmes: 65,
      projects: 18,
      consumptionRate: '72%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    { region: 'Louga', programmes: 40, projects: 12, consumptionRate: '54%' },
    {
      region: 'Diourbel',
      programmes: 55,
      projects: 16,
      consumptionRate: '63%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    {
      region: 'Matam',
      programmes: 35,
      projects: 10,
      consumptionRate: '48%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    {
      region: 'Kaffrine',
      programmes: 20,
      projects: 7,
      consumptionRate: '42%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    {
      region: 'Kolda',
      programmes: 45,
      projects: 14,
      consumptionRate: '58%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    { region: 'Sédhiou', programmes: 30, projects: 9, consumptionRate: '50%' },
    {
      region: 'Tambacounda',
      programmes: 25,
      projects: 8,
      consumptionRate: '45%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
    {
      region: 'Kédougou',
      programmes: 15,
      projects: 5,
      consumptionRate: '35%',
      chartData: { labels: ['Taux conso', 'Taux alloué'], values: [20, 10] },
    },
  ];

  //if (!isClient) return null; // Empêche le rendu côté serveur

  function BlinkingPane() {
    const [render, setRender] = useState(true);
    const timerRef = useRef();

    useEffect(() => {
      timerRef.current = setInterval(() => {
        setRender((r) => !r);
      }, 5000);
      return () => {
        clearInterval(timerRef.current);
      };
    }, []);

    return render ? (
      <Pane name="cyan-rectangle" style={{ zIndex: 500 }}>
        <Rectangle bounds={outer} pathOptions={{ color: 'cyan' }} />
      </Pane>
    ) : null;
  }

  //if (typeof window !== "undefined") {
  //const height = window.innerHeight;
  //}
 /*  useEffect(() => {
    const height = window.innerHeight;
   }, []) */

  return (
    <>
      <Text mb={2.5} p={2} fontWeight="600" fontSize={14}>
        Répartition par région
      </Text>
      <MapContainer
        center={[14.4974, -14.4524]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <BlinkingPane />
        {programmeData.map((programme) => (
          <Circle
            key={programme.region}
            center={regionsCoordinates[programme.region]}
            radius={programme.programmes * 100}
            color="blue"
          >
            <Popup>
              <strong>{programme.region}</strong>
              <br />
              Programmes: {programme.programmes}
              <br />
              Nombre de projets: {programme.projects}
              <br />
              Taux de consommation: {programme.consumptionRate}
              <Box width='200px' height='200px' mt={2}>
                <PieDoug data={programme.chartData} />
              </Box>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </>
  );
};
