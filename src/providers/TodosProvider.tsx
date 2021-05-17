import React, {useEffect, useState} from 'react';

import createCtx from '../utils/createCtx';
import {TodoType, todoResolvers, SetTodosFunc} from '../utils/database';
import {handleError} from '../utils/handleError';

interface Context {
  todos: TodoType[];
  createTodo: (todoText: string) => void;
  getAllTodos: (getAllTodosFunc: SetTodosFunc) => void;
  toggleCompletedState: (id: number, isCompleted: boolean) => void;
  updateTodos: (id: number, editedText: string) => void;
  deleteTodo: (id: number) => void;
  isDBLoadingCompleted: boolean;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children: React.ReactElement;
}

const TodosProvider: React.FC<Props> = ({children}) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const [isDBLoadingCompleted, setDBLoadingCompleted] = useState<boolean>(
    false,
  );

  useEffect(() => {
    async function loadDataAsync(): Promise<void> {
      try {
        await todoResolvers.setupDatabaseAsync();

        setDBLoadingCompleted(true);
      } catch (e) {
        handleError(e);
      }
    }

    loadDataAsync();
  }, []);

  useEffect(() => {
    const getAllTodoFunc = (results: TodoType[]): void => {
      const temp: TodoType[] = [];

      for (const item of results) temp.push(item);

      setTodos(temp);
    };

    if (isDBLoadingCompleted)
      if (todoResolvers.getAllTodos) todoResolvers.getAllTodos(getAllTodoFunc);
  }, [isDBLoadingCompleted]);

  const getAllTodos = (): void => todoResolvers.getAllTodos(setTodos);

  const createTodo = (todoText: string): void =>
    todoResolvers.createTodo(todoText, setTodos);

  const toggleCompletedState = (todoId: number, newState: boolean): void =>
    todoResolvers.toggleCompletedState(todoId, newState, setTodos);

  const updateTodos = (todoId: number, newText: string): void =>
    todoResolvers.updateTodo(todoId, newText, setTodos);

  const deleteTodo = (todoId: number): void =>
    todoResolvers.deleteTodo(todoId, setTodos);

  const TodosContext = {
    isDBLoadingCompleted,
    todos,
    getAllTodos,
    createTodo,
    updateTodos,
    deleteTodo,
    toggleCompletedState,
  };

  return <Provider value={TodosContext}>{children}</Provider>;
};

export {useCtx as useTodos, TodosProvider, TodoType};
