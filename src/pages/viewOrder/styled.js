import styled from "styled-components";

const Border = styled.div`
  height: 0.1875rem;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  background-position-x: -1.875rem;
  background-size: 7.25rem 0.1875rem;
  background-image: repeating-linear-gradient(
    45deg,
    #6fa6d6,
    #6fa6d6 33px,
    transparent 0,
    transparent 41px,
    #f18d9b 0,
    #f18d9b 74px,
    transparent 0,
    transparent 82px
  );
`;

const EditIcon = styled.div`
  paddingLeft: 10px,
  color: #6fa6d,
  cursor: pointer,
`
export { Border, EditIcon }