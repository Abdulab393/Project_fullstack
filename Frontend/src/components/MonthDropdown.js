import React from 'react';

const MonthDropdown = ({ selectedMonth, onChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <select value={selectedMonth} onChange={onChange}>
      {months.map((month, index) => (
        <option key={index} value={month}>{month}</option>
      ))}
    </select>
  );
};

export default MonthDropdown;
