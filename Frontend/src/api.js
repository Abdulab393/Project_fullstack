import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';  // Adjust this to your actual API base URL

export const fetchTransactions = async (month, page = 1, search = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, {
      params: { month, page, search }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const fetchStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics`, {
      params: { month }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

export const fetchBarChart = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/barchart`, {
      params: { month }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    throw error;
  }
};

export const fetchPieChart = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/piechart`, {
      params: { month }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    throw error;
  }
};
