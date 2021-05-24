import React, {useEffect, useState} from 'react';

import createCtx from '../utils/createCtx';
import {TodoType, todoResolvers} from '../utils/database';
import {handleError} from '../utils/handleError';

interface Context {
  todos: TodoType[];
  highlightedTodos: TodoType[];
  createTodo: (todoText: string) => void;
  toggleCompleteStatus: (id: number, isCompleted: boolean) => void;
  toggleHighlightStatus: (id: number, isHighlighted: boolean) => void;
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
  const [highlightedTodos, setHighlightedTodos] = useState<TodoType[]>([]);

  const [isDBReady, setDBReady] = useState<boolean>(false);
  const [isTodoReady, setTodoReady] = useState<boolean>(false);

  const getNewTodos = async (): Promise<void> => {
    const todoTemp: TodoType[] = [];
    const highlightedTemp: TodoType[] = [];

    await todoResolvers.getAllTodos().then((results) => {
      results?.map((item) => {
        if (item.isHighlighted) highlightedTemp.push(item);
      });

      if (results) todoTemp.push(...results);
    });

    setTodos(todoTemp);
    setHighlightedTodos(highlightedTemp);
  };

  useEffect(() => {
    async function loadDataAsync(): Promise<void> {
      try {
        // await todoResolvers.dropDatabaseTablesAsync();
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
    else handleError('Can not create todo');
  };

  const toggleCompleteStatus = (todoId: number, newState: boolean): void => {
    if (todoResolvers.toggleCompleteStatus(todoId, newState)) getNewTodos();
    else handleError('Can not toggle status');
  };

  const toggleHighlightStatus = (todoId: number, newState: boolean): void => {
    if (todoResolvers.toggleHighlightStatus(todoId, newState)) getNewTodos();
    else handleError('Can not toggle status');
  };

  const updateTodos = (todoId: number, newText: string): void => {
    if (todoResolvers.updateTodo(todoId, newText)) getNewTodos();
    else handleError('Can not update todo');
  };

  const deleteTodo = (todoId: number): void => {
    if (todoResolvers.deleteTodo(todoId)) getNewTodos();
    else handleError('Can not delete todo');
  };

  const TodosContext = {
    isTodoReady,
    todos,
    highlightedTodos,
    createTodo,
    updateTodos,
    deleteTodo,
    toggleCompleteStatus,
    toggleHighlightStatus,
  };

  return <Provider value={TodosContext}>{children}</Provider>;
};

export {useCtx as useTodos, TodosProvider, TodoType};
