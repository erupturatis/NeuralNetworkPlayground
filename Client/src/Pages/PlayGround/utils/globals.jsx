let networkState;
let operations;

// I made this file to be able to access the state without
// the use of hooks since they are bound to components
let setNetworkState = (state) => {
  networkState = state;
};

let setOperations = (obj) => {
  operations = obj;
};

export { setNetworkState, setOperations, networkState, operations };
