export const actionDel = (num) => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'DEL_TODO', num });
  }, 2000);
};
