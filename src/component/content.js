import React, { useState } from "react";
import { Layout, Card, Row, Col, Button } from "antd";
import DynamicMultiSeriesChart from "./chart";
import { BulbFilled } from "@ant-design/icons";
import Gauge from "./gauge";
const { Content } = Layout;
const { Meta } = Card;
const ContentData = () => {
  const [value, setValue] = useState(60);

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
                  hoverable
                  className="shadow-box"
                  style={{ width: "99.5%" }}
                  cover={<img alt="example" src="/coral.png" />}
                >
                  <Meta title="Ph Leveling Sensor" />
                  <p className="mt-2">
                    Current Status: <b style={{ color: "red" }}>21321</b>
                  </p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card
                  hoverable
                  className="shadow-box"
                  style={{ width: "99.5%" }}
                  cover={<img alt="example" src="/creature.png" />}
                >
                  <Meta title="Temperature Sensor" />
                  <p className="mt-2">
                    Current Status: <b style={{ color: "red" }}>12321</b>
                  </p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card
                  hoverable
                  className="shadow-box"
                  style={{ width: "99.5%" }}
                  cover={<img alt="example" src="/tds.png" />}
                >
                  <Meta title="TDS Sensor" />
                  <p className="mt-2">
                    Current Status: <b style={{ color: "red" }}>1241</b>
                  </p>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card
                  hoverable
                  className="shadow-box"
                  style={{ width: "100%" }}
                  cover={<img alt="example" src="/bulb.jpg" />}
                >
                  <Meta title="UV Light" />

                  <Row>
                    <Col xs={19} sm={19} md={19} lg={19} xl={19}>
                      <p className="mt-2">
                        Current Status: <b style={{ color: "red" }}> On</b>{" "}
                      </p>
                    </Col>
                    <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                      <Button
                        icon={<BulbFilled />}
                        size={"middle"}
                        type="text"
                        style={{ color: "green" }}
                      ></Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
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
            <Card hoverable className="shadow-box">
              <DynamicMultiSeriesChart />
            </Card>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default ContentData;
