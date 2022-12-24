import ky from 'ky';

const BASE_URL = import.meta.env.VITE_API_URL;
console.log('test change');
export const createNetwork = async (network) => {
  // creates a new network
  console.log('net ehre', network);
  let url = BASE_URL + '/network/create';

  let response = await ky.post(url, {
    json: {
      network,
    },
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  return response;
};

export const deleteNetwork = async (id) => {
  // deletes Network with that id
  let url = BASE_URL + '/network/' + id;
  let response = await ky.delete(url);
  return response;
};

export const updateNetwork = async (id, network) => {
  let url = BASE_URL + '/' + id;
  await ky.put(url, {
    json: { network },
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
};

export const getNetwork = async (id) => {
  let url = BASE_URL + '/network/' + id;
  let response = await ky.get(url, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  return response;
};

export const updateUserNetworkID = async (id, networkIDS) => {
  // updating user according to the new passed user
  let url = BASE_URL + '/user/networkIDS';
  let response = await ky.patch(url, {
    json: {
      id,
      networkIDS,
    },
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  return response;
};

export const updateUserNetworkName = async (id, networkName) => {
  // updating user according to the new passed user
  let url = BASE_URL + '/user/networkName';
  let response = await ky.patch(url, {
    json: {
      id,
      networkName,
    },
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  return response;
};
