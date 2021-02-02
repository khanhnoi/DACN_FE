import { Row, Card } from "antd";
import styled from "styled-components";
import imgBg from "../../assets/images/quan-ao-thoi-trang.png";

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
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(${imgBg});
  text-shadow: 0 0.2px 0.3px rgba(0, 0, 0, 0.353);
  background-size: cover;
`;

const LoginForm = styled(Card)`
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  border-radius: 15px;
`;
export { Box, LoginForm };
