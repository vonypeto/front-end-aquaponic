import React, { useEffect, useState } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import { Divider, Tag } from "antd";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = (props) => {
  const { phLeveling, tds, temperature, battery, isChecked, setIsChecked } =
    props;

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
        dataPoints: isChecked[`${"phLeveling"}`] ? phLeveling : [],
      },
      {
        yValueFormatString: "",
        xValueFormatString: "MMMM D YYYY, h:mm:ss ",
        type: "spline",
        dataPoints: isChecked[`${"temperature"}`] ? temperature : [],
      },
      {
        yValueFormatString: "",
        xValueFormatString: "MMMM D YYYY, h:mm:ss ",
        type: "spline",
        dataPoints: isChecked[`${"tds"}`] ? tds : [],
      },
      {
        yValueFormatString: "",
        xValueFormatString: "MMMM D YYYY, h:mm:ss ",
        type: "spline",
        dataPoints: isChecked[`${"battery"}`] ? battery : [],
      },
    ],
  };
  const updateObject = (type) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [`${type}`]: !isChecked[`${type}`],
    }));
  };
  return (
    <div style={{ height: "100%" }}>
      <div>
        <Tag
          onClick={() => {
            updateObject("temperature");
          }}
          color={isChecked[`${"temperature"}`] ? "rgb(192,80,78)" : "red"}
          className="rounded"
        >
          Temperature
        </Tag>
        <Tag
          onClick={() => {
            updateObject("phLeveling");
          }}
          color={isChecked[`${"phLeveling"}`] ? "rgb(79,129,188)" : "blue"}
          className="rounded"
        >
          pH Level
        </Tag>
        <Tag
          onClick={() => {
            updateObject("battery");
          }}
          color={isChecked[`${"battery"}`] ? "rgb(35,191,170)" : "green"}
          className="rounded"
        >
          Battery
        </Tag>
        <Tag
          onClick={() => {
            updateObject("tds");
          }}
          color={isChecked[`${"tds"}`] ? "rgb(155,187,88)" : "lime"}
          className="rounded"
        >
          TDS
        </Tag>
      </div>
      <CanvasJSChart options={options} /* onRef={ref=> this.chart = ref} */ />
     
    </div>
  );
};

export default SplineChart;
