import React from 'react';

const Popup = ({ text, callbackForward, callbackCancel, option }) => {
  return (
    <>
      <div className="absolute border-2 w-64 h-28  right-0 z-10 bg-white rounded-md ">
        <div>
          <div className=" text-black font-medium m-2 text-lg"> {text}</div>
          <div className="flex justify-end">
            <div>
              <button
                className="  bg-[#941C1C] p-1 px-3 rounded-md font-medium"
                onClick={() => {
                  callbackCancel();
                }}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className=" mx-4 bg-[#1E9BB7] p-1 px-3 rounded-md font-medium"
                onClick={() => {
                  callbackForward();
                  callbackCancel();
                }}
              >
                {option}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
