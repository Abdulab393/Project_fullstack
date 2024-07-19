import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../api';

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const stats = await fetchStatistics(month);
        setStatistics(stats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    loadStatistics();
  }, [month]);

  // Render your statistics here using the statistics state
  return <div>{/* Your statistics rendering code */}</div>;
};

export default StatisticsBox;
