import { Row } from "antd";
import styled from "styled-components";
import bgMasthead from "../../assets/images/quan-ao-thoi-trang.png";

const Masthead = styled(Row)`
  overflow: auto;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(
      to bottom,
      rgba(92, 77, 66, 0.8) 0%,
      rgba(92, 77, 66, 0.8) 100%
    ),
    url(${bgMasthead});
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
`;

export { Masthead };
