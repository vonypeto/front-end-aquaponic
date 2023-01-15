import React, { useState, useEffect } from "react";
import Head from "../component/header";
import Content from "../component/content";
import Footer from "../component/footer";
import { Layout, Card, Row, Col } from "antd";

const LayoutForm = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  console.log(width);
  useEffect(
    () => {
      const listener = window.addEventListener(
        "resize",
        updateWindowDimensions
      );
      updateWindowDimensions();
    },
    [height],
    [width]
  );
  return (
    <div>
      <Layout>
        <Head />
        <Layout>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content />
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutForm;
