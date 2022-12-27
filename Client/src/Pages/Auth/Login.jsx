import React from 'react';
const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const google = () => {
    window.open(`${BASE_URL}/auth/google`, '_self');
  };

  const github = () => {
    window.open(`${BASE_URL}/auth/github`, '_self');
  };

  return (
    <div className=" w-full h-full flex justify-center items-center ">
      <div className=" -translate-y-20">
        <div className="  text-white text-center text-3xl font-bold mb-4">
          Log in to Playground
        </div>
        <div>
          <div className="flex justify-center">
            <button
              onClick={github}
              class=" my-4 bg-gray-900 text-gray-100 hover:text-white shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer w-64 mt-2 bg-opacity-80 hover:bg-opacity-100 transition"
            >
              <svg
                viewBox="0 0 24 24"
                class="fill-current mr-3 w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span class="border-l border-gray-800 h-6 w-1 block mr-1"></span>
              <span class="pl-3">Sign up with Github</span>
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={google}
              class="bg-[#4285f4] text-gray-100 hover:text-white shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer w-64 bg-opacity-80 hover:bg-opacity-100 transition"
            >
              <svg
                viewBox="0 0 24 24"
                class="fill-current mr-3 w-6 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
              </svg>
              <span class="border-l border-white-500 h-6 w-1 block"></span>
              <span class="pl-3">Sign up with Google</span>
            </button>
          </div>
        </div>
        <div className="  text-white opacity-60 text-center text-md mb-4 w-96 mt-4">
          Don't worry about creating an account, we will make one for you if
          this is your first time
        </div>
      </div>
    </div>
  );
};

export default Login;
