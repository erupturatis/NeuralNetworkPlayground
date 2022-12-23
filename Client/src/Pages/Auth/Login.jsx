import React from 'react';
const BASE_URL = 'https://seal-app-4qpjq.ondigitalocean.app/api';

const Login = () => {
  const google = () => {
    window.open(`${BASE_URL}/auth/google`, '_self');
  };

  return (
    <div className="text-white m-12">
      <button
        className="border-2 p-4 "
        onClick={() => {
          google();
        }}
      >
        Login me
      </button>
    </div>
  );
};

export default Login;
