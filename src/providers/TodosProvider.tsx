import React, {useEffect, useState} from 'react';

import createCtx from '../utils/createCtx';
import {TodoType, todoResolvers} from '../utils/database';
import {handleError} from '../utils/handleError';

interface Context {
  todos: TodoType[];
  createTodo: (todoText: string) => void;
  toggleCompleteStatus: (id: number, isCompleted: boolean) => void;
  updateTodos: (id: number, editedText: string) => void;
  deleteTodo: (id: number) => void;
  isTodoReady: boolean;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children: React.ReactElement;
}

const TodosProvider: React.FC<Props> = ({children}) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const [isDBReady, setDBReady] = useState<boolean>(false);
  const [isTodoReady, setTodoReady] = useState<boolean>(false);

  const getNewTodos = async (): Promise<void> => {
    let temp: TodoType[] = [];

    await todoResolvers.getAllTodos().then((results) => {
      if (results) temp.push(...results);
    });

    setTodos(temp);
  };

  useEffect(() => {
    async function loadDataAsync(): Promise<void> {
      try {
        await todoResolvers.setupDatabaseAsync();

        setDBReady(true);
      } catch (e) {
        handleError(e);
      }
    }

    loadDataAsync();
  }, []);

  useEffect(() => {
    if (isDBReady) {
      getNewTodos();
      setTodoReady(true);
    }
  }, [isDBReady]);

  const createTodo = (todoText: string): void => {
    if (todoResolvers.createTodo(todoText)) getNewTodos();
  };

  const toggleCompleteStatus = (todoId: number, newState: boolean): void => {
    if (todoResolvers.toggleCompleteStatus(todoId, newState)) getNewTodos();
  };

  const updateTodos = (todoId: number, newText: string): void => {
    if (todoResolvers.updateTodo(todoId, newText)) getNewTodos();
  };

  const deleteTodo = (todoId: number): void => {
    if (todoResolvers.deleteTodo(todoId)) getNewTodos();
  };

  const TodosContext = {
    isTodoReady,
    todos,
    createTodo,
    updateTodos,
    deleteTodo,
    toggleCompleteStatus,
  };

  return <Provider value={TodosContext}>{children}</Provider>;
};

export {useCtx as useTodos, TodosProvider, TodoType};
