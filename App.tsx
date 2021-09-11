import React from "react";
import TodoApp from "./src/TodoApp";

import { store } from "./src/store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
