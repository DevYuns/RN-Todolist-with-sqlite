import * as SQLite from 'expo-sqlite';
import {DB_TODOS, SCHEMA_NAME} from '../constants';
import {handleError} from './handleError';

/* createdAt 과 completedAt 으로 비교해서 완료 비교. 토글을 위해서는 null값으로 줬다가 새로 시간줬다가 하기 */
export type TodoType = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export type SetTodosFunc = (results: TodoType[]) => void;
export type GetTodoFunc = (todo: TodoType) => void;

export interface TodoResolvers {
  getAllTodos: (getAllTodosFunc: SetTodosFunc) => void;
  getTodo: (id: number, getTodoFunc: GetTodoFunc) => void;
  createTodo: (text: string, createTodoFunc: SetTodosFunc) => void;
  updateTodo: (
    id: number,
    editedText: string,
    updateTodoFunc: SetTodosFunc,
  ) => void;
  toggleCompletedState: (
    id: number,
    isCompleted: boolean,
    toggleTodoFunc: SetTodosFunc,
  ) => void;
  deleteTodo: (id: number, deleteTodoFunc: SetTodosFunc) => void;

  dropDatabaseTablesAsync: () => Promise<void>;
  setupDatabaseAsync: () => Promise<void>;
}

const DBInstance: SQLite.Database | undefined = SQLite.openDatabase(DB_TODOS);

const setupDatabaseAsync = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    DBInstance.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists ${SCHEMA_NAME} (id integer primary key autoincrement not null, text varchar(255), isCompleted bool)`,
        );
      },
      () => {
        reject();
      },
      () => {
        resolve();
      },
    );
  });
};

const dropDatabaseTablesAsync = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    DBInstance.transaction(
      (tx) => {
        tx.executeSql(`drop table ${SCHEMA_NAME}`);
      },
      () => {
        reject();
      },
      () => {
        resolve();
      },
    );
  });
};

const getAllTodos = (getAllTodosFunc: SetTodosFunc): void => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(
        `select * from ${SCHEMA_NAME}`,
        [],
        (_, results: SQLite.SQLResultSet) => {
          let temp: TodoType[] = [];

          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));

          getAllTodosFunc(temp);
        },
      );
    });
  } catch (error) {
    handleError(error);
  }
};

const getTodo = (todoId: number, getTodoFunc: GetTodoFunc): void => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(
        `select * from ${SCHEMA_NAME} where id = ?`,
        [todoId],
        (_, results) => {
          const len = results.rows.length;

          if (len > 0) getTodoFunc(results.rows.item(0));
        },
      );
    });
  } catch (error) {
    handleError(error);
  }
};

const createTodo = (todoText: string, createTodoFunc: SetTodosFunc): void => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(
        `insert into ${SCHEMA_NAME} (text, isCompleted) values (?, ?)`,
        [todoText, false],
        (_, results: SQLite.SQLResultSet) => {
          if (results.rowsAffected > 0) getAllTodos(createTodoFunc);
        },
      );
    });
  } catch (error) {
    handleError(error);
  }
};

const toggleCompletedState = (
  todoId: number,
  isCompleted: boolean,
  toggleTodoFunc: SetTodosFunc,
): void => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(
        `update ${SCHEMA_NAME} set isCompleted=? where id=?`,
        [isCompleted, todoId],
        (_, results) => {
          if (results.rowsAffected > 0) getAllTodos(toggleTodoFunc);
        },
      );
    });
  } catch (error) {
    handleError(error);
  }
};

const updateTodo = (
  todoId: number,
  editedText: string,
  updateTodoFunc: SetTodosFunc,
): void => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(
        `update ${SCHEMA_NAME} set text=? where id=?`,
        [editedText, todoId],
        (_, results) => {
          if (results.rowsAffected > 0) getAllTodos(updateTodoFunc);
        },
      );
    });
  } catch (error) {
    handleError(error);
  }
};

const deleteTodo = (todoId: number, deleteTodoFunc: SetTodosFunc): void => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(
        `delete from ${SCHEMA_NAME} where id=?`,
        [todoId],
        (_, results) => {
          if (results.rowsAffected > 0) getAllTodos(deleteTodoFunc);
        },
      );
    });
  } catch (error) {
    handleError(error);
  }
};

export const todoResolvers: TodoResolvers = {
  setupDatabaseAsync,
  dropDatabaseTablesAsync,
  createTodo,
  getAllTodos,
  getTodo,
  toggleCompletedState,
  updateTodo,
  deleteTodo,
};
