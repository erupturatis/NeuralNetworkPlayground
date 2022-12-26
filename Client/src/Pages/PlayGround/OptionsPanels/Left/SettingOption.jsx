import React from 'react';
import { useDispatch } from 'react-redux';
import { changeProperty } from '../../../../store/network';

const SettingOption = ({ prop, value, setTrigger }) => {
  const dispatch = useDispatch();
  return (
    <button
      className=" cursor-pointer w-full bg-[#192332] hover:bg-[#243247] transition mb-1 font-light"
      onClick={() => {
        dispatch(
          changeProperty({
            prop,
            value,
          })
        );
        setTrigger();
      }}
    >
      {value}
    </button>
  );
};

export default SettingOption;
