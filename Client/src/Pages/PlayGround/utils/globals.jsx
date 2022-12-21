let networkState;
let operations;
// need to be refactored with redux or some
// non-polluting method

export const setNetworkState = (state) => {
  networkState = state;
};

export const setOperations = (obj) => {
  operations = obj;
  return obj;
};

export { networkState, operations };
