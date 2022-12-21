import React from 'react';
import SettingOption from './SettingOption';

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
        <div className="m-2 w-24">{name}</div>
        <button
          className="border-2 w-48 text-center"
          onClick={() => {
            setTrigger((e) => !e);
          }}
        >
          {value}
        </button>
        <div className="border-2 w-2 relative">
          {trigger && (
            <div className="relative">
              <div className="absolute border-2 w-36 h-16 left-6">
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
      </div>
    </>
  );
};

export default Settings;
