import * as SQLite from 'expo-sqlite';
import {DB_TODOS, SCHEMA_NAME} from '../constants';
import {handleError} from './handleError';

export type TodoType = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export type SetTodosType = (results: TodoType[]) => void;
export type GetTodoType = (todo: TodoType) => void;

export interface TodoResolvers {
  getAllTodos: (getAllTodosFunc: SetTodosType) => void;
  getTodo: (id: number, getTodoFunc: GetTodoType) => void;
  createTodo: (text: string, createTodoFunc: SetTodosType) => void;
  updateTodo: (
    id: number,
    editedText: string,
    updateTodoFunc: SetTodosType,
  ) => void;
  toggleCompletedState: (
    id: number,
    isCompleted: boolean,
    toggleTodoFunc: SetTodosType,
  ) => void;
  deleteTodo: (id: number, deleteTodoFunc: SetTodosType) => void;

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

const getAllTodos = (getAllTodosFunc: SetTodosType): void => {
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

const getTodo = (todoId: number, getTodoFunc: GetTodoType): void => {
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

const createTodo = (todoText: string, createTodoFunc: SetTodosType): void => {
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
  toggleTodoFunc: SetTodosType,
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
  updateTodoFunc: SetTodosType,
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

const deleteTodo = (todoId: number, deleteTodoFunc: SetTodosType): void => {
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
