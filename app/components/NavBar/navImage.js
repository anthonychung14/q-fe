import React from 'react';
import styled from 'styled-components';

import NormalImg from 'components/Img';

const Img = styled(NormalImg)`
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: block;
`;

const ImageWrapper = styled.div`
  height: 50px;
`;

export default props => (
  <ImageWrapper>
    <Img {...props} />
  </ImageWrapper>
);
