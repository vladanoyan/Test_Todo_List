const TodoList = [
  {
    name: "It's really testy1",
    id: 1,
  },
  {
    name: "It's really testy2",
    id: 2,
  },
  {
    name: "It's really testy3",
    id: 3,
  },
  {
    name: "It's really testy4",
    id: 4,
  },
  {
    name: "It's really testy5",
    id: 5,
  },
];

const todo = (state = TodoList, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('dispatch Add Item !!!', state);
      return [
        ...state,
        {
          name: action.name,
          id: action.ky,
        },
      ];
    case 'UPDATE':
      return [
        ...state,
      ];
    case 'DEL_TODO':
      console.log('dispatch Delete Item !!!', state);
      return state.filter(element => element.id !== action.num);
    default:
      return state;
  }
};
export default todo;
