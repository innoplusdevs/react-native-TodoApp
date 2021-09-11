import { ADD_TODO, DELETE_TODO, TOGGLE_COMPLETE } from "../actions/types";


const initialState = {
  toDoList: []
};

export function todosReducer(state: any = initialState, action: any): any {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        toDoList: [...state.toDoList, action.payload]
      };
    case DELETE_TODO:
      return {
        ...state,
        toDoList: state.toDoList.filter(
          (todo: any) => todo.id != action.payload.id
        )
      };

    case TOGGLE_COMPLETE:
      return {
        ...state,
        toDoList: state.toDoList.map((todo: any) => {
          if (todo.id === action.payload.id) todo.completed = !todo.completed;
          return todo;
        })
      }
    default:
      return state;
  }
}