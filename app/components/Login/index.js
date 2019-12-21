import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

export const Login = ({ firebase }) => (
  <div>
    <Button
      text="Google"
      handleClick={() => {
        firebase.login({ provider: 'google', type: 'popup' });
      }}
    />
    <Button
      text="Request Access"
      handleClick={() => {
        firebase.login({ provider: 'google', type: 'popup' });
        // opens mail client.
      }}
    />
  </div>
);

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
};

export default Login;
