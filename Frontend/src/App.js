import React, { useState } from 'react';
import MonthDropdown from './components/MonthDropdown';
import TransactionTable from './components/TransactionTable';
import StatisticsBox from './components/StatisticsBox';
import BarChart from './components/BarChart';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>
      <MonthDropdown selectedMonth={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TransactionTable selectedMonth={selectedMonth} searchQuery={searchQuery} />
      <StatisticsBox selectedMonth={selectedMonth} />
      <BarChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
