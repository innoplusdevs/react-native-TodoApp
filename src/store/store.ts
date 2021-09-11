import { createStore } from 'redux';
import { todosReducer } from '../reducer/todosReducer';

// const store: any = createStore(todosReducer);
export const store = createStore(todosReducer);

// store.getState();
// export default store;