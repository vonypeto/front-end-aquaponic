import React from "react";

import { Layout } from "antd";

const { Header } = Layout;

const header = () => {
  return (
    <Header theme="light">
      <div className="w-100 text-center head-center">
        <div className="text-center">
          <h1>
            Indoor Solar-Powered Aquaponics System for Ornamental Fish and
            Hydroponic Plants
          </h1>{" "}
          <br />
        </div>
      </div>
    </Header>
  );
};

export default header;
