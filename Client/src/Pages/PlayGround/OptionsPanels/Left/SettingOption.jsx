import React from 'react';
import { useDispatch } from 'react-redux';
import { changeProperty } from '../../../../store/network';

const SettingOption = ({ prop, value, setTrigger }) => {
  const dispatch = useDispatch();
  return (
    <button
      className=" cursor-pointer w-full"
      onClick={() => {
        dispatch(
          changeProperty({
            prop,
            value,
          })
        );
        setTrigger((e) => !e);
      }}
    >
      Select {value}
    </button>
  );
};

export default SettingOption;
