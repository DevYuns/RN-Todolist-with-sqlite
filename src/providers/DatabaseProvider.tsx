import React, {useEffect, useState} from 'react';
import {TodoType} from '../components/uis/Todo';

import createCtx from '../utils/createCtx';
import {DBTodoType, todoDatabase} from '../utils/database';

interface Context {
  todoCtx: TodoType[];
  createTodo: (todoText: string) => void;
  getAllTodos: any;
  toggleCompletedState: any;
  updateTodos: any;
  deleteTodo: any;
  isDBLoadingComplete: boolean;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
}

const DatabaseProvider: React.FC<Props> = ({children}) => {
  const [todoCtx, setTodos] = useState<TodoType[]>([]);
  const [isDBLoadingComplete, setDBLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    async function loadDataAsync(): Promise<void> {
      try {
        await todoDatabase.setupDatabaseAsync();

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  useEffect(() => {
    const getAllTodoFunc = (results: DBTodoType[]): void => {
      const temp: TodoType[] = [];

      for (const item of results) temp.push(item);

      setTodos(temp);
    };

    if (isDBLoadingComplete)
      if (todoDatabase.getAllTodos) todoDatabase.getAllTodos(getAllTodoFunc);
  }, [isDBLoadingComplete]);

  const getAllTodos = (): any => {
    if (todoDatabase.getAllTodos)
      return todoDatabase.getAllTodos(() => {
        console.log('getAllTodos in provider completed');
      });
  };

  const createTodo = (todoText: string): void => {
    if (todoDatabase.createTodo) todoDatabase.createTodo(todoText, setTodos);
  };

  const toggleCompletedState = (todoId: number, newState: boolean): void => {
    if (todoDatabase.toggleCompletedState)
      todoDatabase.toggleCompletedState(todoId, newState, setTodos);
  };

  const updateTodos = (todoId: number, newText: string): void => {
    if (todoDatabase.updateTodo)
      todoDatabase.updateTodo(todoId, newText, setTodos);
  };

  const deleteTodo = (todoId: number): void => {
    if (todoDatabase.deleteTodo) todoDatabase.deleteTodo(todoId, setTodos);
  };

  const DBContext = {
    isDBLoadingComplete,
    todoCtx,
    getAllTodos,
    createTodo,
    updateTodos,
    deleteTodo,
    toggleCompletedState,
  };

  return <Provider value={DBContext}>{children}</Provider>;
};

export {useCtx as useDatabase, DatabaseProvider, TodoType};
