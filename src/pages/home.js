import React from "react";
import {
  Skeleton,
  Button,
  Input,
  Space,
  Row,
  Col,
  Card,
  Select,
  Option,
  message,
} from "antd";
Option = Select.Option;

const Home = () => {
  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} xl={3} xxl={3}></Col>
          <Col
            style={{ marginTop: "10px" }}
            xs={24}
            sm={24}
            md={24}
            xl={5}
            xxl={5}
          >
            <Card size="large" title="Input" className="shadow-box">
              <Space size={20} direction="vertical">
                <div className="p-3 form-group gap-text">
                  <label className="w-100 ">Scheduling Algorithim</label>
                </div>

                <div className="mt-3">
                  <label>Arrival Times </label>

                  <Input
                    style={{ width: "100%", marginTop: "8px" }}
                    size="large"
                    className="w-100"
                    placeholder="2 4 6 5"
                  />
                </div>
                <div className="mt-3">
                  <label>Burst Times </label>

                  <Input
                    style={{ width: "100%", marginTop: "8px" }}
                    size="large"
                    className="w-100"
                    placeholder="4 8 12 4"
                  />
                </div>

                <Button type="primary" size="large">
                  Calculate
                </Button>
              </Space>
            </Card>
          </Col>
          <Col
            style={{ marginTop: "10px" }}
            xs={24}
            sm={24}
            md={24}
            xl={13}
            xxl={13}
          >
            <Card title="Output" className="shadow-box">
              asda
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
