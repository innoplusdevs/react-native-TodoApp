import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

import { connect } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../src/actions/actions";

interface IToDo {
  text: string;
  completed: boolean;
}

let TodoApp: any = (store: any) => {
  // console.log(store, "TodoApp");
  const toDoList = store.toDoList;
  console.log(toDoList);

  const [value, setValue] = useState<string>("");
  // const [toDoList, setToDos] = useState<IToDo[]>([]);
  // const { toDoList }: any = useSelector((state) => state.toDoList);
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim())
      // setToDos([...toDoList, { text: value, completed: false }]);
      store.dispatch(addTodo({ text: value, completed: false }));
    else showError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    // const newToDoList = [...toDoList];
    // newToDoList.splice(index, 1);
    // setToDos(newToDoList);
    store.dispatch(deleteTodo(index));
  };

  const toggleComplete = (index: number): void => {
    // const newToDoList = [...toDoList];
    // newToDoList[index].completed = !newToDoList[index].completed;
    // setToDos(newToDoList);
    console.log(index);
    store.dispatch(toggleTodo(index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Enter your todo task...'
          value={value}
          onChangeText={(e) => {
            setValue(e);
            showError(false);
          }}
          style={styles.inputBox}
        />
        <Button title='Add Task' onPress={handleSubmit} />
      </View>
      {error && (
        <Text style={styles.error}>Error: Input field is empty...</Text>
      )}
      <Text style={styles.subtitle}>Your Tasks :</Text>
      {toDoList.length === 0 && <Text>No to do task available</Text>}
      <ScrollView>
        {toDoList.map((toDo: any) => (
          <View style={styles.listItem} key={`${toDo.id}_${toDo.task.text}`}>
            <Text
              style={[
                styles.task,
                {
                  textDecorationLine: toDo.completed ? "line-through" : "none",
                },
              ]}>
              {toDo.task.text}
            </Text>
            <Button
              title={toDo.task.completed ? "Completed" : "Complete"}
              onPress={() => toggleComplete(toDo.id)}
            />
            <Button
              title='X'
              onPress={() => {
                removeItem(toDo.id);
              }}
              color='crimson'
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputBox: {
    width: 200,
    borderColor: "green",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "green",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  addButton: {
    alignItems: "flex-end",
  },
  task: {
    width: 200,
  },
  error: {
    color: "red",
  },
});

const mapStateToProps = (state: any) => {
  console.log(state.toDoList, "abajo");
  return {
    toDoList: state.toDoList,
  };
};

TodoApp = connect(mapStateToProps)(TodoApp);

export default TodoApp;
