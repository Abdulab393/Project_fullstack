const transactionService = require('../services/transactionService.js');

const initializeDatabase = async (req, res) => {
  try {
    await transactionService.fetchAndSaveTransactions();
    res.send('Database initialized');
  } catch (error) {
    res.status(500).send(error);
  }
};

const listTransactions = async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;

  try {
    const transactions = await transactionService.getTransactions(month, page, perPage, search);
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    const statistics = await transactionService.getStatistics(month);
    res.json(statistics);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBarChart = async (req, res) => {
  const { month } = req.query;

  try {
    const barChartData = await transactionService.getBarChartData(month);
    res.json(barChartData);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPieChart = async (req, res) => {
  const { month } = req.query;

  try {
    const pieChartData = await transactionService.getPieChartData(month);
    res.json(pieChartData);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      transactionService.getTransactions(month, 1, 1000000, ''),
      transactionService.getStatistics(month),
      transactionService.getBarChartData(month),
      transactionService.getPieChartData(month)
    ]);

    res.json({ transactions, statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData
};
