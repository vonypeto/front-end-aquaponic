import React, { useEffect, useState } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import { Divider, Tag } from "antd";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = (props) => {
  const { phLeveling } = props;
  console.log(phLeveling);
  const options = {
    animationEnabled: true,
    title: {
      text: "AQUAPONIC CHART MAP ",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      title: "",
      prefix: "",
      includeZero: false,
    },
    data: [
      {
        yValueFormatString: "",
        xValueFormatString: "MMMM D YYYY, h:mm:ss ",
        type: "spline",
        dataPoints: phLeveling,
      },
    ],
  };

  return (
    <div style={{ height: "100%" }}>
      <div>
        <Tag color="magenta" className="rounded">
          TDS
        </Tag>
        <Tag color="red" className="rounded">
          Temperature
        </Tag>
        <Tag color="blue" className="rounded">
          Ph Leveling
        </Tag>
      </div>
      <CanvasJSChart options={options} /* onRef={ref=> this.chart = ref} */ />{" "}
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart
                    properties and methods*/}{" "}
    </div>
  );
};

export default SplineChart;
