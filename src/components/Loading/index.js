import React from "react";
import { RingLoader } from "react-spinners";
import { LazyLoading } from './styled'

const Loading = () => (
  <LazyLoading>
    <RingLoader sizeUnit="px" loading size={100} color="#74B1E5" />
  </LazyLoading>
);

export default Loading;
