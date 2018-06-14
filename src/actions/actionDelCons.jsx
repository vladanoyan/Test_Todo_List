export const actionDelCons = (num) => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'DEL_TODO_CONS', num });
  }, 2000);
};
