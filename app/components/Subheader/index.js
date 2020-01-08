import React from 'react';
import styled from 'styled-components';
import COLORS from 'constants/colors';

const Wrapper = styled.section`
  background: ${({ secondary }) =>
    secondary ? COLORS.primaryLight : COLORS.lightBlue};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
`;

const Subheader = props => (
  <Wrapper secondary={props.secondary}>
    {props.text && <h3>{props.text}</h3>}
    {props.renderText && props.renderText()}
  </Wrapper>
);

export default Subheader;
