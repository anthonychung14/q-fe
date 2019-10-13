import React from 'react';
import styled from 'styled-components';
import COLORS from 'constants/colors';

const Wrapper = styled.section`
  background: ${COLORS.primaryLight};
  display: flex;
  justify-content: center;
  color: black;
  padding-top: 42px;
`;

const ViewHeader = props => (
  <Wrapper>
    <h2>{props.header}</h2>
  </Wrapper>
);

export default ViewHeader;
