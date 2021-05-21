import * as SQLite from 'expo-sqlite';
import {DB_TODOS, SCHEMA_NAME} from '../constants';
import {handleError} from './handleError';

export type TodoType = {
  id: number;
  text: string;
  isCompleted: boolean;
  isHighlighted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface TodoResolvers {
  getAllTodos: () => Promise<TodoType[] | undefined>;
  getTodo: (id: number) => Promise<TodoType | undefined>;
  createTodo: (text: string) => boolean;
  updateTodo: (id: number, editedText: string) => boolean;
  deleteTodo: (id: number) => boolean;

  toggleCompleteStatus: (id: number, isCompleted: boolean) => boolean;
  toggleHighlightStatus: (id: number, isHighlighted: boolean) => boolean;

  dropDatabaseTablesAsync: () => Promise<void>;
  setupDatabaseAsync: () => Promise<void>;
}

const DBInstance: SQLite.Database | undefined = SQLite.openDatabase(DB_TODOS);

const setupDatabaseAsync = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    DBInstance.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists ${SCHEMA_NAME} 
            (
              id integer primary key autoincrement not null,
              text varchar(255), 
              isCompleted integer default 0, 
              isHighlighted integer default 0,
              createdAt datetime default (datetime('now', 'localtime')),
              updatedAt datetime default (datetime('now', 'localtime'))
            )`,
        );
      },
      () => {
        reject('Fail to create a todo table');
      },
      () => {
        resolve();
      },
    );
  });
};

const dropDatabaseTablesAsync = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    DBInstance.transaction(
      (tx) => {
        tx.executeSql(`drop table ${SCHEMA_NAME}`);
      },
      () => {
        reject('Fail to drop a todo table');
      },
      () => {
        resolve();
      },
    );
  });
};

const getAllTodos = (): Promise<TodoType[] | undefined> => {
  let temp: TodoType[] = [];

  return new Promise((resolve, reject) => {
    DBInstance.transaction(
      (tx) => {
        tx.executeSql(
          `select * from ${SCHEMA_NAME}`,
          [],
          (_, results: SQLite.SQLResultSet) => {
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
          },
        );
      },
      () => {
        reject('Fail to get todos from todos table');
      },
      () => {
        resolve(temp);
      },
    );
  });
};

const getTodo = (todoId: number): Promise<TodoType | undefined> => {
  let todo: TodoType;

  return new Promise((resolve, reject) => {
    DBInstance.transaction(
      (tx) => {
        tx.executeSql(
          `select * from ${SCHEMA_NAME} where id = ?`,
          [todoId],
          (_, results: SQLite.SQLResultSet) => {
            if (results.rows.length > 0) todo = results.rows.item(0);
          },
        );
      },
      () => {
        reject('Fail to get todo from todos table');
      },
      () => {
        resolve(todo);
      },
    );
  });
};

const createTodo = (todoText: string): boolean => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(`insert into ${SCHEMA_NAME} (text) values (?)`, [todoText]);
    });

    return true;
  } catch (error) {
    handleError(error);

    return false;
  }
};

const toggleCompleteStatus = (
  todoId: number,
  isCompleted: boolean,
): boolean => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(`update ${SCHEMA_NAME} set isCompleted=? where id=?`, [
        isCompleted,
        todoId,
      ]);
    });

    return true;
  } catch (error) {
    handleError(error);

    return false;
  }
};

const toggleHighlightStatus = (
  todoId: number,
  isHighlighted: boolean,
): boolean => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(`update ${SCHEMA_NAME} set isHighlighted=? where id=?`, [
        isHighlighted,
        todoId,
      ]);
    });

    return true;
  } catch (error) {
    handleError(error);

    return false;
  }
};

const updateTodo = (todoId: number, editedText: string): boolean => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(
        `update ${SCHEMA_NAME} set text=?, updatedAt=datetime('now', 'localtime') where id=?`,
        [editedText, todoId],
      );
    });

    return true;
  } catch (error) {
    handleError(error);

    return false;
  }
};

const deleteTodo = (todoId: number): boolean => {
  try {
    DBInstance.transaction((tx) => {
      tx.executeSql(`delete from ${SCHEMA_NAME} where id=?`, [todoId]);
    });

    return true;
  } catch (error) {
    handleError(error);

    return false;
  }
};

export const todoResolvers: TodoResolvers = {
  setupDatabaseAsync,
  dropDatabaseTablesAsync,
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  toggleCompleteStatus,
  toggleHighlightStatus,
};
