import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import todo from './todo';
import secondList from './secondList';

export default combineReducers({
  form: reduxFormReducer,
  todo,
  secondList,
});
