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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ArcElement);

// Custom plugin for Pie chart
const doughnutCenterTextPlugin = {
  id: 'doughnutCenterText',
  beforeDraw(chart) {
    const { ctx, chartArea, data } = chart;
    if (chart.config.type === 'pie') {
      const { width, height } = chartArea;
      const centerX = width / 2;
      const centerY = height / 2;
      const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

      ctx.save();
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#333';

      // Draw total in the center
      ctx.fillText('Total: 2659', centerX, centerY - 10);
      // Draw percentage text
      data.datasets[0].data.forEach((value, index) => {
        const percentage = ((value / total) * 100).toFixed(1);
        const label = data.labels[index];
        const angle = (index * Math.PI * 2) / data.datasets[0].data.length;
        const radius = Math.min(centerX, centerY) * 0.5;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.fillText(`${label}: ${percentage}%`, x, y);
      });
      ctx.restore();
    }
  },
};

const Dashboard = () => {
  // Data for Line Chart
  const lineData = {
    labels: ['6/30/2024-7/6/2024', '7/7/2024-7/13/2024','7/14/2024-7/27/2024'],
    datasets: [
      {
        label: 'Orders',
        data: [4, 3, 2, 2, 4],
        borderColor: ' #FFA500', 
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
        data: [1404, 1200, 900, 800, 600],
        borderColor: '#ADD8E6', // SteelBlue color for Sales
        backgroundColor: '#ADD8E6',
        fill: false,
        tension: 0.1,
        yAxisID: 'y', // Default y axis
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
        title: {
          display: true,
          
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis
        },
        title: {
          display: true,
          
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
            if (context.dataset.label === 'Orders') {
              return `Orders: ${context.raw}`;
            } else {
              return `Sales: $${context.raw}`;
            }
          },
        },
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
          color: '#333',
          padding: 15,
          boxWidth: 15,
          boxHeight: 15,
          usePointStyle: true, // Makes the legend markers circular
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(1) + '%'; 
          },
        },
      },
      doughnutCenterText: doughnutCenterTextPlugin, // Register custom plugin
    },
    maintainAspectRatio: false,
  };
  

  return (
    <div>
        <h2>Dashboard</h2>
    <div className="dashboard-container">
      <div className="chart-wrapper">
        <h3>Sales vs Orders <i class="bi bi-exclamation-circle"></i></h3>
        <Line data={lineData} options={lineOptions} />
      </div>
      <div className="chart-wrapper1">
        <h3>Portion of Sales <i class="bi bi-exclamation-circle"></i></h3>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
