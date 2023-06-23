import * as echarts from "echarts";
import React from "react";
import DonutChart from "react-donut-chart";
import "../App.css";

const ChartsGraph = () => {
  return (
    <DonutChart
      data={[
        {
          label: "Above 10LPA",
          value: 35,
        },
        {
          label: "Above 15LPA",
          value: 20,
        },
        {
            label :"Above 20LPA",
            value : 15
        },{
            label : "Above 5LPA",
            value: 70
        }
      ]}

      width={470}
      height={370}
      interactive={true}
      className='mobChart donutchart'
    />
  );
};

export default ChartsGraph;
