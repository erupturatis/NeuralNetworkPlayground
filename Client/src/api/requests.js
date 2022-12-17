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
  let url = BASE_URL + '/' + id;
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
  let url = BASE_URL + '/' + id;
  let response = await ky.get(url, {
    network,
  });
  return response;
};
