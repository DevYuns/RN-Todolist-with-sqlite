import React, {useEffect, useState} from 'react';
import {TodoType} from '../components/uis/Todo';

import createCtx from '../utils/createCtx';
import {todoDatabase} from '../utils/database';

interface Context {
  dbTodos: TodoType[];
  applyChanges: () => void;
  isDBLoadingComplete: boolean;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
}

const DatabaseProvider: React.FC<Props> = ({children}) => {
  const [dbTodos, setTodos] = useState<TodoType[]>([]);
  const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadDataAsync(): Promise<void> {
      try {
        await todoDatabase.dropDatabaseTablesAsync();
        await todoDatabase.setupDatabaseAsync();

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  useEffect(() => {
    if (isDBLoadingComplete)
      if (todoDatabase.getAllTodos) return todoDatabase.getAllTodos(setTodos);
  }, [isDBLoadingComplete]);

  // TODO: db 파일에서 어떻게 함수를 가져와서 콜백을 넘겨줄 지 고민하기..
  // 일일히 함수를 만들지 말고,,, gettodo랑 변경된 사항을 provider에 알려줄 changeTodo만 만들어보자
  // 각파일에서 database.ts에서 함수를 가져와서 변경을 가하고 useDatabase의 update함수만 불러서 클라이언트 변경사항을
  // DB에 반영하도록만 하면 된다!
  const applyChanges = (): void => {};

  const getAllTodos = (): any => {
    if (todoDatabase.getAllTodos)
      return todoDatabase.getAllTodos(() => {
        console.log('getAllTodos in provider completed');
      });
  };

  const DBContext = {
    dbTodos,
    applyChanges,
    getAllTodos,
    isDBLoadingComplete,
  };

  return <Provider value={DBContext}>{children}</Provider>;
};

export {useCtx as useDatabase, DatabaseProvider};
