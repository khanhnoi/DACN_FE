import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const ContentLayout = (props) => {
  return (
    <>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: `calc(100vh - 60px)`,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </>
  );
};

export default ContentLayout;
