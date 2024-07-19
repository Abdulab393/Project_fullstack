import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../api';

const TransactionTable = ({ month, search }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const transactionData = await fetchTransactions(month, page, search);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    loadTransactions();
  }, [month, page, search]);

  // Render your table here using the transactions state
  return (
    <div>
      {/* Your table rendering code */}
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TransactionTable;
