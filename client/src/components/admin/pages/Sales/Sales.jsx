import { useEffect, useState } from 'react';
import './Sales.scss';

const Sales = () => {
  const [salesData, setSalesData] = useState(null);
  const [totalProfit, setTotalProfit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sales');
        const data = await response.json();
        setSalesData(data);
        // Extracting total profit from the sales data
        const { totalProfit } = data;
        setTotalProfit(totalProfit[0].total_profit_all_products);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  if (!salesData) {
    return <div>Loading...</div>;
  }

  const { interest, revenue } = salesData;

  return (
    <div className='Sales'>
      <div className='Sales__Table'>
        <h1>Interest per product</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {interest.map((item, index) => (
                <tr key={index}>
                  <td>{item.product_id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='Sales__Table'>
        <h1>Revenue | Total Profit: {totalProfit}</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Total Profit</th>
                <th>Total Sold</th>
              </tr>
            </thead>
            <tbody>
              {revenue.map((item, index) => (
                <tr key={index}>
                  <td>{item.product_id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.total_profit}</td>
                  <td>{item.total_sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;
