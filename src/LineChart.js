import React, { useState, useEffect } from "react";
import { baseUrl } from "./utils/services";
import { Line } from '@ant-design/charts';

const LineChart = () => {

  const [orderData, setOrderData] = useState([]);

  const GetOrders = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/order/all_order`);
      const data = await res.json();
      setOrderData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetOrders();
  }, []);

  const processData = () => {
    const monthMap = {
      'January': 0,
      'February': 1,
      'March': 2,
      'April': 3,
      'May': 4,
      'June': 5,
      'July': 6,
      'August': 7,
      'September': 8,
      'October': 9,
      'November': 10,
      'December': 11
    };
    const data = [];
    const ordersByMonth = new Array(12).fill(0);
    orderData.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.getMonth();
      ordersByMonth[month]++;
    });
    Object.entries(monthMap).forEach(([monthName, monthIndex]) => {
      data.push({
        Month: monthName,
        value: ordersByMonth[monthIndex],
      });
    });
    return data;
  };

  const config = {
    data: processData(),
    height: 400,
    xField: 'Month',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  return (
    <>
      <Line {...config} />
    </>
  );
};

export default LineChart;
