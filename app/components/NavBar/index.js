// @flow
import React from 'react';
import styled from 'styled-components';

import COLORS from 'constants/colors';
// import NavImage from './navImage';

const Wrapper = styled.section`
  padding: 0.5em;
  background: ${COLORS.primaryDark};
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid ${COLORS.accentGreen};
`;

const NavBar = props => <Wrapper />;

export default NavBar;
