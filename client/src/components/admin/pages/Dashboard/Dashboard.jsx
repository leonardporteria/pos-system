import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';

import './Dashboard.scss';

const BarChart = ({ orderTotal }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (orderTotal.length > 0) {
      const labels = orderTotal.slice(-10).map((order) => order.order_id);
      const data = orderTotal.slice(-10).map((order) => order.total_price);

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('barChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Price',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [orderTotal]);

  return (
    <div className='Barchart'>
      <h2>Last 10 Stock Order Total Expenses</h2>
      <canvas id='barChart'></canvas>
    </div>
  );
};

BarChart.propTypes = {
  orderTotal: PropTypes.arrayOf(
    PropTypes.shape({
      order_id: PropTypes.string.isRequired,
      total_price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const DonutChart = ({ topSelling }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (topSelling.length > 0) {
      const labels = topSelling
        .slice(0, 10)
        .map((product) => product.product_name);
      const data = topSelling.slice(0, 10).map((product) => product.total_sold);

      const ctx = document.getElementById('donutChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Sold',
              data: data,
              backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(120, 204, 55, 0.6)',
                'rgba(51, 153, 204, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(102, 102, 102, 0.6)',
                'rgba(255, 102, 204, 0.6)',
              ],

              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Top Selling Products',
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [topSelling]);

  useEffect(() => {
    if (chartRef.current && topSelling.length > 0) {
      const labels = topSelling
        .slice(0, 10)
        .map((product) => product.product_name);
      const data = topSelling.slice(0, 10).map((product) => product.total_sold);

      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets[0].data = data;
      chartRef.current.update();
    }
  }, [topSelling]);

  return (
    <div className='Donutchart'>
      <h2>Top Selling Products</h2>
      <canvas id='donutChart'></canvas>
    </div>
  );
};

DonutChart.propTypes = {
  topSelling: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.string.isRequired,
      product_name: PropTypes.string.isRequired,
      total_profit: PropTypes.string.isRequired,
      total_sold: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Dashboard = () => {
  const [transactionsCount, setTransactionsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [orderTotal, setOrderTotal] = useState([]);
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const transactionsCountValue =
          data.transactionsCount[0]?.transactionsCount || 0;
        const ordersCountValue = data.ordersCount[0]?.ordersCount || 0;
        const productCountValue = data.productCount[0]?.productCount || 0;
        const revenueValue =
          parseFloat(data.revenue[0]?.total_profit_all_products) || 0;

        setTransactionsCount(transactionsCountValue);
        setOrdersCount(ordersCountValue);
        setProductCount(productCountValue);
        setRevenue(revenueValue);

        setOrderTotal(data.orderTotal);
        setTopSelling(data.topSelling);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='Dashboard'>
      <div className='Dashboard__Header'>
        <div className='Dashboard__Header__Card'>
          <h1>Total Transactions Count:</h1>
          <p>{transactionsCount}</p>
        </div>
        <div className='Dashboard__Header__Card'>
          <h1>Total Orders Count:</h1>
          <p>{ordersCount}</p>
        </div>
        <div className='Dashboard__Header__Card'>
          <h1>Products Count: </h1>
          <p>{productCount}</p>
        </div>
        <div className='Dashboard__Header__Card'>
          <h1>Revenue: </h1>
          <p>₱{revenue}</p>
        </div>
      </div>
      <div className='Dashboard__Main'>
        <BarChart orderTotal={orderTotal} />
        <div className='Dashboard__Main__Bar'>
          <DonutChart topSelling={topSelling} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
