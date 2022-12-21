import React from 'react';
import { useState, useEffect } from 'react';
import NetworkButton from './NetworkButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  createNetwork,
  updateUserNetworkID,
  deleteNetwork,
  getNetwork,
} from '../../api/requests';
import { setUser } from '../../store/user';
import { replaceState } from '../../store/network';
import { replaceRecording } from '../../store/recording';
const OptionsRight = () => {
  const { network, recording, user, running } = useSelector((state) => state);
  const [selected, setSelected] = useState(-1);
  const [totalNetworks, setTotalNetworks] = useState([0, 1, 2]);
  const [name, setName] = useState('network');
  const dispatch = useDispatch();

  useEffect(() => {
    // loading the Network from the database
    if (selected === -1) return;
    console.log('loading selected');
  }, [selected]);

  let packageData = () => {
    let packet = {};
    packet.name = name;
    packet.networkArhitecture = network;
    if (recording.saved) {
      packet.recording = recording;
    }
    return packet;
  };

  let saveNetwork = async (index) => {
    // saving a new network on the index slot
    setSelected(index);
    let packet = packageData();
    let response = await createNetwork(packet);
    response = await response.json();
    // saving the id for the current user
    // locally
    let networkID = [...user.user.networkID];
    let updatedUser = {
      ...user.user,
    };
    networkID[index] = response.id;
    updatedUser.networkID = [...networkID];
    dispatch(setUser(updatedUser));
    // in database
    let resp = await updateUserNetworkID(updatedUser[`_id`], networkID);
  };

  let clearNetwork = async (index) => {
    setSelected(index);
    let updatedUser = {
      ...user.user,
    };
    let networkID = [...updatedUser.networkID];
    let targetID = updatedUser.networkID[index];
    // deleting Network from database
    let response = await deleteNetwork(targetID);
    // deleting from user data locally
    networkID[index] = '0';

    updatedUser.networkID = [...networkID];
    dispatch(setUser(updatedUser));
    // deleting ID from user data in database
    response = await updateUserNetworkID(
      updatedUser[`_id`],
      updatedUser.networkID
    );
  };

  let loadNetwork = async (index) => {
    // just load the network and the recording in redux
    let targetID = user.user.networkID[index];
    let network = await getNetwork(targetID);
    network = await network.json();
    let recording = network.result.recording;
    network = network.result.networkArhitecture;
    // replacing the network arhitecture
    dispatch(replaceState(network));
    // replacing the recording and other data
    if (recording) {
      dispatch(replaceRecording(recording));
    }
  };

  return (
    <div className=" flex flex-col justify-center align-middle text-center">
      <div>Saved Networks</div>
      {totalNetworks.map((el) => {
        return (
          <NetworkButton
            key={el}
            saveNetwork={saveNetwork}
            clearNetwork={clearNetwork}
            loadNetwork={loadNetwork}
            index={el}
          />
        );
      })}
      <input
        className="text-black"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>
  );
};

export default OptionsRight;
