import React from "react";

import GaugeBg from "./gauge-bg.png";

const gaugeWidth = 170;
const gaugeHeight = 50;
const gaugeContentWidth = gaugeWidth - 12;
const gaugeBarsNb = 10;
const gaugeBarWidth = gaugeContentWidth / gaugeBarsNb;
const gaugeBarMargin = 1;
const gaugeBarRadius = 10;

const styles = {
  container: {
    position: "relative",
    width: `${gaugeWidth}px`,
    height: `${gaugeHeight}px`
  },
  barsContainer: {
    width: `${gaugeWidth}px`,
    height: `${gaugeHeight}px`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "3px"
  },
  barContainer: {
    width: `${gaugeBarWidth}px`,
    height: `${gaugeHeight - 10}px`,
    paddingLeft: `${gaugeBarMargin}px`,
    paddingRight: `${gaugeBarMargin}px`
  },
  bar: {
    width: `${gaugeBarWidth - gaugeBarMargin * 2}px`,
    height: "100%",
    backgroundColor: "#3f5c8c",
    zIndex: 1
  },
  barFirst: {
    borderTopLeftRadius: `${gaugeBarRadius}px`,
    borderBottomLeftRadius: `${gaugeBarRadius}px`
  },
  barLast: {
    borderTopRightRadius: `${gaugeBarRadius}px`,
    borderBottomRightRadius: `${gaugeBarRadius}px`
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 0
  }
};

const Gauge = ({ percentage }) => {
  const percent10 = Math.round(percentage / gaugeBarsNb);
  const percentageArray = [...Array(percent10).keys()];

  return (
    <>
      <div style={styles.container}>
        <img src={GaugeBg} style={styles.bg} />
        <div style={styles.barsContainer}>
          {percentageArray.map((ele, index) => (
            <div style={styles.barContainer}>
              {index === 0 ? (
                <div
                  key={index}
                  style={{ ...styles.bar, ...styles.barFirst }}
                />
              ) : index === gaugeBarsNb - 1 ? (
                <div key={index} style={{ ...styles.bar, ...styles.barLast }} />
              ) : (
                <div key={index} style={{ ...styles.bar }} />
              )}
            </div>
          ))}
        </div>
      </div>
      {percentage}% - {percent10} bars
    </>
  );
};

export default Gauge;
