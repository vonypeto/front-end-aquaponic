import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import { Divider, Tag } from "antd";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SplineChart extends Component {
  render() {
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
          yValueFormatString: "$#,###",
          xValueFormatString: "MMMM",
          type: "spline",
          dataPoints: [
            { x: new Date(2017, 0), y: 25060 },
            { x: new Date(2017, 1), y: 27980 },
            { x: new Date(2017, 2), y: 42800 },
            { x: new Date(2017, 3), y: 32400 },
            { x: new Date(2017, 4), y: 35260 },
            { x: new Date(2017, 5), y: 33900 },
            { x: new Date(2017, 6), y: 40000 },
            { x: new Date(2017, 7), y: 52500 },
            { x: new Date(2017, 8), y: 32300 },
            { x: new Date(2017, 9), y: 42000 },
            { x: new Date(2017, 10), y: 37160 },
            { x: new Date(2017, 11), y: 38400 },
          ],
        },
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "MMMM",
          type: "spline",
          dataPoints: [
            { x: new Date(2017, 0), y: 15060 },
            { x: new Date(2017, 1), y: 17980 },
            { x: new Date(2017, 2), y: 12800 },
            { x: new Date(2017, 3), y: 32400 },
            { x: new Date(2017, 4), y: 35260 },
            { x: new Date(2017, 5), y: 23900 },
            { x: new Date(2017, 6), y: 10000 },
            { x: new Date(2017, 7), y: 12500 },
            { x: new Date(2017, 8), y: 12300 },
            { x: new Date(2017, 9), y: 12000 },
            { x: new Date(2017, 10), y: 17160 },
            { x: new Date(2017, 11), y: 18400 },
          ],
        },
      ],
    };

    return (
      <div style={{ height: "100%" }}>
        <h1> React Spline Chart </h1>{" "}
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
  }
}

export default SplineChart;
