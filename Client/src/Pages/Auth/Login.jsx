import React from 'react';

const Login = () => {
  const google = () => {
    window.open('http://localhost:3000/auth/google', '_self');
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
