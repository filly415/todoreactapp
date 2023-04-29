import React, { useState, useEffect } from "react";
import "./App.css";
import WithLayout from "../layout/Layout";
import {
  VStack,
  Container
} from "@chakra-ui/react";

import AppHeader from "../components/AppHeader";
import TodoList from "../components/TodoList";
import { Task } from "../interfaces/Task";
import { AXIOS } from "../config/config";
import LoadingScreen from "../components/Loading";

function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const getTasks = async () => {
    return await AXIOS.get("/tasks")
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data.tasks)
          setLoading(false);
        }
      });
    };
    
  useEffect(() => {
    getTasks();
    setLoading(true);
  }, []);

  const handleTasks = (todos: any) => {
    setTodos(todos);
  }

  return WithLayout(
    <Container>
      <VStack minH={'100vh'}>
      {isLoading ? <LoadingScreen /> :
        <>
          <AppHeader handleTasks={handleTasks} />
          <TodoList totalTasks={todos} handleTasks={handleTasks} />
        </>
      }
      </VStack>
    </Container>
  );
}

export default App;
