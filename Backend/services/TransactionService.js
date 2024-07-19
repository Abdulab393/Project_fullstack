const axios = require('axios');
const Transaction = require('../models/Transaction');

const fetchAndSaveTransactions = async () => {
  const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
  await Transaction.deleteMany({});
  await Transaction.insertMany(response.data);
};

const getTransactions = async (month, page, perPage, search) => {
  const regex = new RegExp(search, 'i');
  const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;

  return await Transaction.find({
    dateOfSale: { $month: monthIndex },
    $or: [
      { title: regex },
      { description: regex },
      { price: regex }
    ]
  })
  .skip((page - 1) * perPage)
  .limit(parseInt(perPage));
};

const getStatistics = async (month) => {
  const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;

  const totalSaleAmount = await Transaction.aggregate([
    { $match: { dateOfSale: { $month: monthIndex } } },
    { $group: { _id: null, total: { $sum: '$price' } } }
  ]);

  const totalSoldItems = await Transaction.countDocuments({
    dateOfSale: { $month: monthIndex },
    isSold: true
  });

  const totalNotSoldItems = await Transaction.countDocuments({
    dateOfSale: { $month: monthIndex },
    isSold: false
  });

  return {
    totalSaleAmount: totalSaleAmount[0]?.total || 0,
    totalSoldItems,
    totalNotSoldItems
  };
};

const getBarChartData = async (month) => {
  const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
  
  const ranges = [
    [0, 100], [101, 200], [201, 300], [301, 400], [401, 500],
    [501, 600], [601, 700], [701, 800], [801, 900], [901, Infinity]
  ];
  
  return await Promise.all(ranges.map(async ([min, max]) => {
    const count = await Transaction.countDocuments({
      dateOfSale: { $month: monthIndex },
      price: { $gte: min, $lt: max === Infinity ? Number.MAX_SAFE_INTEGER : max }
    });
    return { range: `${min}-${max}`, count };
  }));
};

const getPieChartData = async (month) => {
  const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;

  const data = await Transaction.aggregate([
    { $match: { dateOfSale: { $month: monthIndex } } },
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);

  return data.map(item => ({ category: item._id, count: item.count }));
};

module.exports = {
  fetchAndSaveTransactions,
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData
};
