import React, { useState,useEffect } from "react";
import { Pie } from '@ant-design/plots';
import { baseUrl } from "../utils/services";

const PieChart = () => {

  const [pending,setPending]=useState();
  const [inProgress,setInProgress]=useState();
  const [packed,setPacked]=useState();
  const [shipped,setShipped]=useState();
  const [delivered,setDelivered]=useState();
  const [canceled,setCanceled]=useState();
  

  useEffect(()=>{
    GetOrders();
  },[]);

  const GetOrders = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/order/all_order`);
      const data = await res.json();
      const PendingArr = [];
      const InProgressArr = [];
      const PackedArr = [];
      const ShippedArr = [];
      const DeliveredArr = [];
      const CancelArr = [];
      for (var i of data.data) {
        if (i.orderStatus === "Pending") {
          PendingArr.push(i);
        } else if (i.orderStatus === "InProgress") {
          InProgressArr.push(i);
        } else if (i.orderStatus === "Packed") {
          PackedArr.push(i);
        } else if (i.orderStatus === "Shipped") {
          ShippedArr.push(i);
        } else if (i.orderStatus === "Delivered") {
          DeliveredArr.push(i);
        } else if (i.orderStatus === "Cancel") {
          CancelArr.push(i);
        }
      }
      setPending(PendingArr.length);
      setInProgress(InProgressArr.length);
      setPacked(PackedArr.length);
      setShipped(ShippedArr.length);
      setDelivered(DeliveredArr.length);
      setCanceled(CancelArr.length);
    } catch (err) {
      console.log(err);
    }
  };


    const data = [
        { type: 'Pending', value: pending},
        { type: 'InProgress', value: inProgress},
        { type: 'Packed', value: packed},
        { type: 'Shipped', value:shipped},
        { type: 'Delivered',value: delivered},
        { type: 'Cancel',value: canceled},
        
      ];
  
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          type: 'outer',
          content: '{name} {percentage}',
        },
        interactions: [
          {
            type: 'pie-legend-active',
          },
          {
            type: 'element-active',
          },
        ],
      };

return(
    <>
                  <Pie {...config} />
                
    </>
)
}

export default PieChart;