import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

export const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(user => user.name),
    datasets: [
      {
        label: 'User Activity',
        data: data.map(user => Math.floor(Math.random() * 100)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  return <Bar data={chartData} />;
};

export const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [
          data.filter(user => user.status === 'active').length,
          data.filter(user => user.status === 'inactive').length,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };
  return <Pie data={chartData} />;
};

export const DonutChart = ({ data }) => {
  const ageGroups = {
    'Under 20': data.filter(user => new Date().getFullYear() - new Date(user.dob).getFullYear() < 20).length,
    '20-30': data.filter(user => {
      const age = new Date().getFullYear() - new Date(user.dob).getFullYear();
      return age >= 20 && age <= 30;
    }).length,
    'Over 30': data.filter(user => new Date().getFullYear() - new Date(user.dob).getFullYear() > 30).length,
  };
  const chartData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        data: Object.values(ageGroups),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };
  return <Doughnut data={chartData} />;
};

export const LineChart = ({ data }) => {
  const monthlyData = Array(12).fill(0);
  data.forEach(user => {
    const month = new Date(user.createdAt).getMonth();
    monthlyData[month]++;
  });
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Users Created',
        data: monthlyData,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };
  return <Line data={chartData} />;
};