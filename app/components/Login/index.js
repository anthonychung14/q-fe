import React from 'react';
import PropTypes from 'prop-types';

import Container from 'components/Container';
import Button from 'components/Button';

export const Login = ({ firebase }) => (
  <Container>
    <Button
      text="Login with Google"
      type="secondary"
      handleClick={() => {
        firebase.login({ provider: 'google', type: 'popup' });
      }}
    />
  </Container>
);

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
};

export default Login;
