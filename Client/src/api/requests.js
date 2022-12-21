import ky from 'ky';
const BASE_URL = 'http://localhost:3000';

export const createNetwork = async (network) => {
  // creates a new network
  let url = BASE_URL + '/network/create';
  let response = await ky.post(url, {
    json: {
      network,
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
    network,
  });
};

export const getNetwork = async (id) => {
  let url = BASE_URL + '/network/' + id;
  let response = await ky.get(url, {});
  return response;
};

export const updateUserNetworkID = async (id, networkIDS) => {
  // updating user according to the new passed user
  let url = BASE_URL + '/user/networkIDS';
  console.log('trying to update user');
  console.log('id here', id);
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
