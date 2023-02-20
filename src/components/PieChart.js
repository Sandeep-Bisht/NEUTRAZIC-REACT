import React from "react";
import { Pie } from '@ant-design/plots';


const PieChart = () => {

    const data = [
        { type: 'Red', value: 27},
        { type: 'Yellow', value: 25},
        { type: 'Green', value: 18 },
        { type: 'pink',value: 15, },
        { type: 'lotte',value: 10 },
        { type: 'Sachin', value: 5},
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