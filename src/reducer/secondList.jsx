const Todos = [
  {
    name: "It's really testy",
    id: 1,
  },
  {
    name: "It's really testy",
    id: 2,
  },
  {
    name: "It's really testy",
    id: 3,
  },
  {
    name: "It's really testy",
    id: 4,
  },
  {
    name: "It's really testy",
    id: 5,
  },
];

const secondList = (state = Todos, action) => {
  switch (action.type) {
    case 'ADD_TODO_CONS':
      console.log('dispatch_Cons Add Item !!!', state);
      return [
        ...state,
        {
          name: action.name,
          id: action.ky,
        },
      ];
    case 'UPDATE_CONS':
      return [
        ...state,
      ];
    case 'DEL_TODO_CONS':
      console.log('dispatch_Cons Delete Item !!!', state);
      return state.filter(element => element.id !== action.num);
    default:
      return state;
  }
};
export default secondList;
