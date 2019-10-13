import React from 'react';
import styled from 'styled-components';
import COLORS from 'constants/colors';

const Wrapper = styled.section`
  background: ${COLORS.orangeAccent};
  display: flex;
  justify-content: center;
  color: black;
`;

const Subheader = props => (
  <Wrapper>
    <h3>{props.text}</h3>
  </Wrapper>
);

export default Subheader;
