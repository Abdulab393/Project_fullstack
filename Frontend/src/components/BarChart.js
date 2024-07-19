import React, { useEffect, useState } from 'react';
import { fetchBarChart } from '../api';

const BarChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const chartData = await fetchBarChart(month);
        setData(chartData);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    loadData();
  }, [month]);

  // Render your chart here using the data state
  return <div>{/* Your chart rendering code */}</div>;
};

export default BarChart;
