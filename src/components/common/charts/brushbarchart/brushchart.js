import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BrushBarChart = ({ data }) => {
  const [zoomRange, setZoomRange] = useState({ start: 0, end: 10 });

  // Main chart data limited by zoom range
  const mainChartData = {
    labels: data.labels.slice(zoomRange.start, zoomRange.end),
    datasets: [
      {
        label: 'PV',
        data: data.pv.slice(zoomRange.start, zoomRange.end),
        backgroundColor: 'rgba(126, 87, 194, 0.8)',
      },
      {
        label: 'UV',
        data: data.uv.slice(zoomRange.start, zoomRange.end),
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
      },
    ],
  };

  // Brush chart data (preview of all data)
  const brushChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'PV',
        data: data.pv,
        backgroundColor: 'rgba(126, 87, 194, 0.2)',
      },
      {
        label: 'UV',
        data: data.uv,
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const brushOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <div style={{ height: '400px' }}>
        <Bar data={mainChartData} options={options} />
      </div>
      <div style={{ height: '100px', marginTop: '20px' }}>
        <Bar data={brushChartData} options={brushOptions} />
      </div>
    </div>
  );
};


