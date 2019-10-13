import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

export const LoginPage = ({ firebase, auth }) => (
  <div>
    <button // <GoogleButton/> button can be used instead
      onClick={() => {
        firebase.login({ provider: 'google', type: 'popup' });
      }}
      type="button"
    >
      Login With Google
    </button>
    <div>
      <h2>Auth</h2>
      {!isLoaded(auth) ? (
        <span>Loading...</span>
      ) : isEmpty(auth) ? (
        <span>Not Authed</span>
      ) : (
        <span>Authed</span>
      )}
    </div>
  </div>
);

/* <pre>{JSON.stringify(auth, null, 2)}</pre> */
LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  connect(state => ({ auth: state.get('firebase').auth })),
)(LoginPage);
