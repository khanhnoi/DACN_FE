import React from "react";
import { Col } from "antd";
import { Content, StyledRow } from "./styled";

const Footer = () => {
  return (
    <div>
      <StyledRow>
        <Col>
          <Content>
            <p type="flex" justify="space-around" align="middle">
              Copyright ©2021 By Khanh Noi
            </p>
          </Content>
        </Col>
      </StyledRow>
    </div>
  );
};

export default Footer;
