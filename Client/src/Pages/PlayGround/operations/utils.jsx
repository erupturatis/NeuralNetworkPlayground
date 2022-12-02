export const transpose = (matrix) => {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
};
