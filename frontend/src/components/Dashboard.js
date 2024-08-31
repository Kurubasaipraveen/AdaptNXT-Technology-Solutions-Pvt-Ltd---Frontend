import React from 'react';
import '../styles/Dashboard.css';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ArcElement, ChartDataLabels);

const doughnutCenterTextPlugin = {
  id: 'doughnutCenterText',
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    const { width, height } = chartArea;
    const centerX = width / 2;
    const centerY = height / 2;
    const centerText = 'Total'; 
    if (chart.config.type === 'pie' || chart.config.type === 'doughnut') {
      ctx.save();
      ctx.font = 'bold 30px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000'; 

      // Draw the center text
      ctx.fillText(centerText, centerX, centerY);

      ctx.restore();
    }
  },
};

ChartJS.register(doughnutCenterTextPlugin);


ChartJS.register(doughnutCenterTextPlugin);

const Dashboard = () => {

  const lineData = {
    labels: ['6/30/2024-7/6/2024', '7/7/2024-7/13/2024', '7/14/2024-7/27/2024'],
    datasets: [
      {
        label: 'Orders',
        data: [4.0, 2.0, 2],
        borderColor: '#FFA500',
        backgroundColor: '#FFA500',
        fill: false,
        tension: 0.1,
        yAxisID: 'y1',
        pointBackgroundColor: '#FFA500',
        pointBorderColor: '#FFA500',
        pointHoverRadius: 6,
      },
      {
        label: 'Sales',
        data: [1.4, 0.8, 0.5], 
        borderColor: '#ADD8E6',
        backgroundColor: '#ADD8E6',
        fill: false,
        tension: 0.1,
        yAxisID: 'y',
        pointBackgroundColor: '#ADD8E6',
        pointBorderColor: '#ADD8E6',
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        min: 0,
        max: 1.6, 
        title: {
          display: true,
        },
        ticks: {
          stepSize: 0.4,
          callback: function (value) {
            return value.toFixed(1) + 'k'; 
          },
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        min: 0,
        max: 4, 
        grid: {
          drawOnChartArea: false, 
        },
        title: {
          display: true,
        },
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value.toFixed(1) + 'k'; 
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}k`; 
          },
        },
      },
      datalabels: {
        display: false, 
      },
    },
  };

  // Data for Pie Chart
  const pieData = {
    labels: ['WooCommerce Store', 'Shopify Store'],
    datasets: [
      {
        data: [55.8, 44.2],
        backgroundColor: ['#FF6347', '#4682B4'],
        hoverBackgroundColor: ['#FF8567', '#5A9BD4'],
        
      },
    ],
  };
  const piecenterlabel={
    text:["total 2629"]
  }

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
          color: '#000',
          padding: 15,
          boxWidth: 15,
          boxHeight: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(1) + '%';
          },
        },
      },
      doughnutCenterText: doughnutCenterTextPlugin, 
    },
    maintainAspectRatio: false,
    text:"Total:2629"
  };
  
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-container">
        <div className="chart-wrapper">
          <h3>Sales vs Orders <i className="bi bi-exclamation-circle"></i></h3>
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="chart-wrapper1">
          <h3>Portion of Sales <i className="bi bi-exclamation-circle"></i></h3>
          <Pie data={pieData} options={pieOptions} text={piecenterlabel}  />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
