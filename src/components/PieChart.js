import React from "react";
import { Pie } from '@ant-design/plots';


const PieChart = () => {

    const data = [
        { type: 'Users', value: 27},
        { type: 'Manufacturer', value: 5},
        { type: 'Products', value: 25},
        { type: 'Category', value: 18 },
        { type: 'Sub-category',value: 15, },
        { type: 'Warehouse',value: 10 },
        
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

export default PieChart