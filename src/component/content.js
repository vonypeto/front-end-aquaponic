import React, { useState, useEffect, useRef } from "react";
import { Layout, Card, Row, Col, Button, Table } from "antd";
import DynamicMultiSeriesChart from "./chart";
import { BulbFilled } from "@ant-design/icons";
import Gauge from "./gauge";
import Moment from "moment";
import axios from "axios";
const { Content } = Layout;
const { Meta } = Card;
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const timeSince = (date) => {
  var time = new Date(date);
  const formatDate = Moment(time).format("lll");
  return formatDate;
};
const ContentData = () => {
  const result = 6;
  const start = useState(0);
  const [value, setValue] = useState(60);
  const [arrayTable, setArrayTable] = useState([]);
  const [current, setCurrent] = useState(0);
  const [currentRow, setCurrentRow] = useState([]);
  const [phLeveling, setPhLeveling] = useState([]);
  const [battery, setBattery] = useState([]);

  const [tds, setTds] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [ledStatus, setLedStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (handleLoading) => {
    try {
      axios.get(`/api/get_data?result=${6}&start=${0}`).then((res) => {
        const data = JSON.parse(res.data);
        console.log(data);
        setLedStatus(data?.led_status);
        console.log(current);
        if (data.data_sensors[0]?._id === current) return console.log(true);
        else {
          console.log(currentRow.length === undefined);
          if (
            Array.isArray(currentRow) &&
            currentRow.length === 1 &&
            currentRow[0].length === 0
          ) {
            let currentDataRow = arrayTable;
            setCurrent(data.data_sensors?._id);
            currentDataRow.unshift(data.data_sensors);
            setCurrentRow(data.data_sensors);
            console.log("single data");
            console.log(currentDataRow);
            setArrayTable(currentDataRow);
            handleLoading();
          } else {
            console.log("multiple single data");

            let newData = data?.data_sensors;
            console.log(arrayTable);
            //   var merged = arrayTable.concat(newData);

            let result = arrayTable.concat(newData).reduce((acc, current) => {
              const x = acc.find((item) => item._id === current._id);
              if (!x) {
                acc.unshift(current);
              }
              return acc;
            }, []);
            console.log(result);
            let phLevelingData = result.map((data, i) => {
              return {
                x: new Date(data.createdAt),
                y: Number(data.ph_leveling),
              };
            });
            phLevelingData = phLevelingData.sort(
              (objA, objB) => Number(objA.x) - Number(objB.x)
            );
            let tdsData = result.map((data, i) => {
              return {
                x: new Date(data.createdAt),
                y: Number(data.tds),
              };
            });
            tdsData = tdsData.sort(
              (objA, objB) => Number(objA.x) - Number(objB.x)
            );
            let temperatureData = result.map((data, i) => {
              return {
                x: new Date(data.createdAt),
                y: Number(data.temperature),
              };
            });
            temperatureData = temperatureData.sort(
              (objA, objB) => Number(objA.x) - Number(objB.x)
            );
            let batteryData = result.map((data, i) => {
              return {
                x: new Date(data.createdAt),
                y: Number(data.battery_percentage),
              };
            });
            batteryData = batteryData.sort(
              (objA, objB) => Number(objA.x) - Number(objB.x)
            );
            setPhLeveling(phLevelingData);
            setTds(tdsData);
            setTemperature(temperatureData);
            setBattery(batteryData);

            setCurrent(data.data_sensors[0]?._id);
            setCurrentRow(data.data_sensors[0]);
            setArrayTable(result);
            handleLoading();
          }
        }
        // if (data.data_sensors.length) {
        //   setStart(start + result);
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoading = () => {
    setIsLoading(false);
  };
  useInterval(() => {
    getData(handleLoading);
  }, 7500);
  const columns = [
    {
      title: "Ph Leveling",
      dataIndex: "ph_leveling",
      key: "ph_leveling",
      render: (_, elm) => <div>{elm.ph_leveling} pH</div>,
    },
    {
      title: "Temperature",
      dataIndex: "temperature",
      key: "temperature",
      render: (_, elm) => (
        <div>
          {elm.temperature} {String.fromCharCode(8451)}
        </div>
      ),
    },
    {
      title: "TDS",
      dataIndex: "tds",
      key: "tds",
      render: (_, elm) => <div>{elm.tds} PPM</div>,
    },
    {
      title: "Battery",
      dataIndex: "battery_percentage",
      key: "battery_percentage",
      render: (_, elm) => <div>{elm.battery_percentage} %</div>,
    },
    {
      title: "Date",
      dataIndex: "actions",
      render: (_, elm) => <div>{timeSince(elm.createdAt)}</div>,
    },
  ];
  // useEffect(() => {
  //   getData();
  // });

  return (
    <div>
      <Content
        className="site-layout-background content-font"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 800,
          boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
          borderRadius: "16px",
        }}
      >
        <div className="head-center mt-2">
          <h3>
            <Row justify={"center"}>
              <Col xs={21} sm={21} md={21} lg={12} xl={9}>
                <Card className="shadow-box text-center">
                  <Row className=" text-center" style={{ margin: " 0 auto" }}>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className=" text-right"
                    >
                      <h1 className="mt-3">Good Day! </h1>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <img
                        alt="example"
                        src="/fish.jpg"
                        style={{
                          width: "6rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </h3>
        </div>
        <Row justify={"center"} gutter={12}>
          <Col xs={24} sm={24} md={24} lg={16} xl={9} className="mb-2">
            <Row gutter={12}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card
                  loading={isLoading}
                  hoverable
                  className="shadow-box"
                  style={{ width: "99.5%" }}
                  cover={<img alt="example" src="/2.png" />}
                >
                  <Meta title="Ph Leveling Sensor" />
                  <p className="mt-2">
                    <b style={{ color: "red" }}>{currentRow?.ph_leveling} pH</b>{" "}
                    from{" "}
                    {Moment(new Date(currentRow?.createdAt))
                      .startOf("minute")
                      .fromNow()}
                  </p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card
                  loading={isLoading}
                  hoverable
                  className="shadow-box"
                  style={{ width: "99.5%" }}
                  cover={<img alt="example" src="/3.png" />}
                >
                  <Meta title="Temperature Sensor" />
                  <p className="mt-2">
                    <b style={{ color: "red" }}>
                      {currentRow?.temperature} {String.fromCharCode(8451)}
                    </b>{" "}
                    from{" "}
                    {Moment(new Date(currentRow?.createdAt))
                      .startOf("minute")
                      .fromNow()}
                  </p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card
                  loading={isLoading}
                  hoverable
                  className="shadow-box"
                  style={{ width: "99.5%" }}
                  cover={<img alt="example" src="/1.png" />}
                >
                  <Meta title="TDS Sensor" />
                  <p className="mt-2">
                    <b style={{ color: "red" }}>{currentRow?.tds} PPM</b> from{" "}
                    {Moment(new Date(currentRow?.createdAt))
                      .startOf("minute")
                      .fromNow()}
                  </p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card
                  loading={isLoading}
                  hoverable
                  className="shadow-box"
                  style={{ width: "100%" }}
                  cover={<img alt="example" src="/4.png" />}
                >
                  <Meta title="UV Light" />

                  <Row>
                    <Col xs={19} sm={19} md={19} lg={19} xl={19}>
                      <p className="mt-2">
                        {" "}
                        Current Status:{" "}
                        <b style={{ color: "red" }}>
                          {ledStatus ? `On` : `Off`}
                        </b>
                      </p>
                    </Col>
                    <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                      <Button
                        icon={<BulbFilled />}
                        size={"middle"}
                        type="text"
                        style={{ color: `${ledStatus ? `green` : `null`}` }}
                      ></Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  loading={isLoading}
                  hoverable
                  className="shadow-box"
                  style={{ width: "100%" }}
                >
                  <Row justify={"center"}>
                    <Col className="text-center">
                      <Gauge percentage={value} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={15}>
            <Card loading={isLoading} hoverable className="shadow-box">
              <DynamicMultiSeriesChart
                temperature={temperature}
                phLeveling={phLeveling}
                tds={tds}
                battery={battery}
              />
            </Card>
            <Card loading={isLoading} hoverable className="shadow-box">
              <Table
                rowKey="_id"
                dataSource={arrayTable}
                columns={columns}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
              />
              ;
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={15}></Col>
        </Row>
      </Content>
    </div>
  );
};

export default ContentData;
