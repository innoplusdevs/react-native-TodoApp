import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";

import { connect } from "react-redux";
import {
  addTodo,
  cloudUpload,
  deleteTodo,
  toggleTodo,
} from "../src/actions/actions";

let TodoApp: any = (store: any) => {
  const toDoList = store.toDoList;
  const [value, setValue] = useState<string>("");
  const [error, showError] = useState<Boolean>(false);
  const [cloudUploaded, setCloudUploaded] = useState<Boolean>(false);

  const handleCloudUpload = async () => {
    let cloudTodos: any;
    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(({ data }: any) => {
        cloudTodos = data;
      })
      .catch((error) => {
        console.log(error);
      });

    store.dispatch(cloudUpload(cloudTodos));
    setCloudUploaded(true);
  };

  const handleSubmit = (): void => {
    if (value.trim())
      store.dispatch(addTodo({ text: value, completed: false }));
    else showError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    store.dispatch(deleteTodo(index));
  };

  const toggleComplete = (index: number): void => {
    store.dispatch(toggleTodo(index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
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
        <Button
          title={cloudUploaded ? "Cloud Uploaded" : "Cloud Upload"}
          disabled={cloudUploaded}
          onPress={handleCloudUpload}
        />
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
                  textDecorationLine: toDo.task.completed
                    ? "line-through"
                    : "none",
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
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
  return {
    toDoList: state.toDoList,
  };
};

TodoApp = connect(mapStateToProps)(TodoApp);

export default TodoApp;
