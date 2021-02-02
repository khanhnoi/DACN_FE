import { Row } from "antd";
import styled from "styled-components";

const Box = styled(Row)`
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  color: rgba(0, 0, 0, 0.653);
  background-image: linear-gradient(150deg, #abdcff 0%, #0396ff 100%);
  text-shadow: 0 0.2px 0.3px rgba(0, 0, 0, 0.353);
  background-size: cover;
`;

export { Box };
