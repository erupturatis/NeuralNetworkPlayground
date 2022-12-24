let operations;
// need to be refactored with redux or some
// non-polluting method

export const setOperations = (obj) => {
  operations = obj;
  return obj;
};

export { operations };
