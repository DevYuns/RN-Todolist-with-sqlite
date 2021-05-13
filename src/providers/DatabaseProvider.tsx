import React, {useEffect, useState} from 'react';

import createCtx from '../utils/createCtx';
import {todoDatabase} from '../utils/database';

interface Context {
  createTodo: (test: string) => any;
  getAllTodos: () => void;
  isDBLoadingComplete: boolean;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
}

const DatabaseProvider: React.FC<Props> = ({children}) => {
  const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadDataAsync(): Promise<void> {
      try {
        await todoDatabase.setupDatabaseAsync();
        await todoDatabase.setupTodoTestAsync();

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  const createTodo = (text: string): any => {
    if (todoDatabase.createTodo)
      return todoDatabase.createTodo(text, () => {
        console.log('createTodo in provider completed');
      });
  };

  const getAllTodos = (): any => {
    if (todoDatabase.getAllTodos)
      return todoDatabase.getAllTodos(() => {
        console.log('getAllTodos in provider completed');
      });
  };

  const DBContext = {
    createTodo,
    getAllTodos,
    isDBLoadingComplete,
  };

  return <Provider value={DBContext}>{children}</Provider>;
};

export {useCtx as useDatabase, DatabaseProvider};
