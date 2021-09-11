import { ADD_TODO, CLOUD_UPLOAD, DELETE_TODO, TOGGLE_COMPLETE } from '../actions/types';

let nextTodoId: number = 0;

interface Task {
  text: string;
  completed: boolean;
}

export const addTodo = (task: Task) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    task
  }
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: {
    id
  }
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_COMPLETE,
  payload: {
    id: id,
  }
});

export const cloudUpload = (cloudTodos: any) => {
  return {
    type: CLOUD_UPLOAD,
    payload: {
      id: nextTodoId,
      cloudTodos
    }
  }
};