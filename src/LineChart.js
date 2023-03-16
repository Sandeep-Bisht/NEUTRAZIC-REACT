import React from "react";
import { Line } from '@ant-design/charts';


const LineChart =() => {

    const data = [
        { Month: 'January', value: 3 },
        { Month: 'February', value: 4 },
        { Month: 'March', value: 3.5 },
        { Month: 'April', value: 5 },
        { Month: 'May', value: 4.9 },
        { Month: 'June', value: 6 },
        { Month: 'July', value: 7 },
        { Month: 'August', value: 9 },
        { Month: 'September', value: 13 },
        { Month: 'October', value: 6 },
        { Month: 'November', value: 10 },
        { Month: 'December', value: 12 },
      ];
    
      const config = {
        data,
        height: 400,
        xField: 'Month',
        yField: 'value',
        point: {
          size: 5,
          shape: 'diamond',
        },
      };

    return(
        <>
                          <Line {...config} />

        </>
    )
}

export default LineChart