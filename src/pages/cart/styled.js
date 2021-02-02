import styled from "styled-components";

const Price = styled.span`
  color: rgb(209, 61, 62);
  font-size: 2rem;
  line-height: 2.125rem;
`;

const ProductName = styled.div`
  white-space: nowrap;
  width: 6em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductTitle = styled.h4`
  color: rgb(209, 61, 62);
`;

const OrderButton = styled.div`
  color: rgb(255, 255, 255);
  text-align: center;
  width: 100%;
  display: block;
  cursor: pointer;
  background: rgb(209, 61, 62);
  padding: 13px 10px;
  border-radius: 4px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  margin: 15px 0px;
  &: hover {
    background: rgba(209, 61, 62, 0.9);
  }
`;

export { Price, ProductName, ProductTitle, OrderButton };
