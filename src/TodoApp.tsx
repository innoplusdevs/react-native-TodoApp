import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  Pressable,
  FlatList,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";

import { connect } from "react-redux";
import {
  addTodo,
  cloudUpload,
  deleteTodo,
  toggleTodo,
} from "../src/actions/actions";

let TodoApp: any = (store: any) => {
  // console.log(Dimensions.get("window").height);

  const toDoList = store.toDoList;
  const [value, setValue] = useState<string>("");
  const [error, showError] = useState<Boolean>(false);
  const [cloudUploaded, setCloudUploaded] = useState<boolean>(false);

  const handleCloudUpload = async () => {
    let cloudTodos: any;
    if (!cloudUploaded) {
      await axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then(({ data }: any) => {
          cloudTodos = data;
          setCloudUploaded(true);
        })
        .catch((error) => {
          console.log(error);
        });

      store.dispatch(cloudUpload(cloudTodos));
    }
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
        <Pressable
          style={styles.customButton}
          disabled={cloudUploaded}
          onPress={handleCloudUpload}>
          <Text style={styles.text}>
            {cloudUploaded ? "Cloud Uploaded" : "Cloud Upload"}
          </Text>
        </Pressable>
      </View>
      {error && (
        <Text style={styles.error}>Error: Input field is empty...</Text>
      )}
      <Text style={styles.subtitle}>Your Tasks :</Text>
      {toDoList.length === 0 && <Text>No to do task available</Text>}
      <FlatList
        style={styles.list}
        data={toDoList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.listItem}>
            <Text
              style={[
                styles.task,
                {
                  textDecorationLine: item.task.completed
                    ? "line-through"
                    : "none",
                },
              ]}>
              {item.task.text}
            </Text>
            <Button
              title={item.task.completed ? "Completed" : "Complete"}
              onPress={() => toggleComplete(item.id)}
            />
            <Button
              title='X'
              onPress={() => {
                removeItem(item.id);
              }}
              color='crimson'
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inputBox: {
    width: "100%",
    borderColor: "green",
    borderRadius: 8,
    borderWidth: 2,
    margin: 5,
    padding: 4,
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
  list: {
    height: "50%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  customButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  task: {
    width: "50%",
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
