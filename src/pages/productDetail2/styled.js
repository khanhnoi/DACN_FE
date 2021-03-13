import styled from "styled-components";
import { Button } from "antd";

const ProductTitle = styled.span`
  color: rgba(0, 0, 0, 0.8);
  display: inline;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
`;

const AddProductButton = styled.div`
  color: rgb(238, 77, 45);
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.03) 0px 1px 1px 0px;
  display: block;
  cursor: pointer;
  background-color: rgba(255, 87, 34, 0.1);
  padding: 13px 10px;
  border-radius: 2px;
  border: 1px solid rgb(238, 77, 45);
  border-image: initial;
  margin: 30px 0px;
  &: hover {
    background-color: rgba(255, 87, 34, 0.15);
  }
`;

export { ProductTitle, AddProductButton };


