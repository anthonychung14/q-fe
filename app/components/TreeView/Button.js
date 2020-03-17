import React from 'react';

const Button = ({ handleClick, text }) => (
  <div
    style={{
      padding: '2%',
      margin: '2%',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <button
      style={{
        border: '1px black solid',
        textAlign: 'center',
        alignItems: 'center',
        height: '40px',
      }}
      onClick={handleClick}
      type="button"
    >
      {text}
    </button>
  </div>
);

export default Button;
