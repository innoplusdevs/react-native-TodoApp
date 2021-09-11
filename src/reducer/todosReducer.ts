import { ADD_TODO, CLOUD_UPLOAD, DELETE_TODO, TOGGLE_COMPLETE } from "../actions/types";


const initialState = {
  toDoList: []
};

let readyUploadTodos: boolean = false;

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
          if (todo.id === action.payload.id) todo.task.completed = !todo.task.completed;
          return todo;
        })
      };

    case CLOUD_UPLOAD:
      if (!readyUploadTodos) {
        const cloudTodos = cloudUpload(action.payload.cloudTodos, action.payload.id);
        return {
          ...state,
          toDoList: [...state.toDoList, ...cloudTodos]
        };
      }
    default:
      return state;
  }
}

const cloudUpload = (cloudTodos: Array<object>, id: number): Array<object> => {
  console.log(cloudTodos, 'cloudUpload function');
  let todos: Array<object> = [];
  let nextTodoId: number = id;

  if (cloudTodos) {
    todos = [...(cloudTodos.map((cloudTodo: any) => {
      const todo = {
        id: ++nextTodoId,
        task: {
          text: cloudTodo.title,
          completed: cloudTodo.completed,
        }
      }
      console.log('hola');
      return todo;
    }))];
  }

  readyUploadTodos = true;
  return todos;
}