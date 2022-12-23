import React from 'react';

const Popup = ({ text, callbackForward, callbackCancel, option }) => {
  return (
    <>
      <div className="absolute border-2 w-44 h-20 -left-16 z-10 bg-lime-600 ">
        <div>
          <div> {text}</div>
          <div className="flex justify-end">
            <div>
              <button
                className=" mr-2 ml-2"
                onClick={() => {
                  callbackCancel();
                }}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className=" mr-2 ml-2"
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
