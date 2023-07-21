import React from 'react';
import SettingOption from './SettingOption';
import arrow from './assets/arrowdown.png';

const Settings = ({
  trigger,
  setTrigger,
  optionsValues,
  name,
  value,
  prop,
}) => {
  return (
    <>
      <div className="mt-2 mb-2 relative flex">
        <div className="m-2 w-24 text-center">{name}</div>
        <button
          className="border-b-2  w-48 text-center"
          onClick={() => {
            setTrigger((e) => !e);
          }}
        >
          {value.length > 18 ? value.slice(0, 18) + '...' : value}
          <img
            src={arrow}
            alt=""
            className={`absolute w-4 right-0 bottom-4 transition ${
              !trigger ? '-rotate-90' : ''
            }`}
          />
        </button>
      </div>
      <div className="">
        {trigger && (
          <div className="relative left-16 my-4">
            <div className="w-60 ">
              {optionsValues.map((el, index) => {
                return (
                  <SettingOption
                    key={index}
                    prop={prop}
                    value={el}
                    setTrigger={setTrigger}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
