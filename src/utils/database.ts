import * as SQLite from 'expo-sqlite';
import {TodoType} from '../components/uis/Todo';

export type GetAllTodosFunc = (results: TodoType[]) => void;
export type GetTodoFunc = (todo: TodoType) => void;
export type CreateTodoFunc = (results: any) => void;
export type UpdateTodoFunc = (results: any) => void;

export interface TodoDatabase {
  getAllTodos?: (getAllTodosFunc: GetAllTodosFunc) => void;
  getTodo?: (id: number, getTodoFunc: GetTodoFunc) => void;
  createTodo?: (text: string, createTodoFunc: CreateTodoFunc) => void;
  updateTodo?: (
    id: number,
    editedText: string,
    updateTodoFunc: UpdateTodoFunc,
  ) => void;
  deleteTodo?: (id: number) => void;

  dropDatabaseTablesAsync?: any;
  setupDatabaseAsync?: any;
}

const databaseInstance: SQLite.Database | undefined = SQLite.openDatabase(
  'todos.db',
);

const dropDatabaseTablesAsync = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    databaseInstance.transaction(
      (tx) => {
        tx.executeSql('drop table todos', []);
      },
      () => {
        console.log('error dropping todos table');
        reject();
      },
      () => {
        resolve();
      },
    );
  });
};

const setupDatabaseAsync = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    databaseInstance.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists todos (id integer primary key autoincrement not null, text varchar(255), isCompleted bool)',
        );
      },
      () => {
        console.log('db error  creating table');
        reject();
      },
      () => {
        console.log('loaded todos');
        resolve();
      },
    );
  });
};

const getAllTodos = (getAllTodosFunc: GetAllTodosFunc): void => {
  databaseInstance.transaction(
    (tx) => {
      tx.executeSql(
        'select * from todos',
        [],
        (_, results: SQLite.SQLResultSet) => {
          let temp: any = [];

          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));

          getAllTodosFunc([
            {id: '2', text: 'sdf', iscompleted: false, isModalOpened: false},
          ]);

          getAllTodosFunc(temp);
        },
      );
    },
    (error) => console.log('db error load todos in database.ts : ', error),
    () => console.log('loaded todos in database.ts'),
  );
};

const getTodo = (todoId: number, getTodoFunc: GetTodoFunc): void => {
  databaseInstance.transaction((tx) => {
    tx.executeSql(
      'select * from todos where id = ?',
      [todoId],
      (_, results) => {
        const len = results.rows.length;

        if (len > 0) getTodoFunc(results.rows.item(0));
      },
    );
  });
};

const createTodo = (todoText: string, createTodoFunc: CreateTodoFunc): void => {
  databaseInstance.transaction((tx) => {
    tx.executeSql(
      'insert into todos (text, isCompleted) values (?, ?)',
      [todoText, false],
      (_, results) => {
        console.log('results : ', results.rowsAffected);
        createTodoFunc(results);
      },
    );
  });
};

const updateTodo = (
  todoId: number,
  editedText: string,
  updateTodoFunc: UpdateTodoFunc,
): void => {
  databaseInstance.transaction((tx) => {
    tx.executeSql(
      'update todos set text=? where id=?',
      [editedText, todoId],
      (_, results) => {
        if (results.rowsAffected > 0) {
          console.log('results : ', results.rowsAffected);
          updateTodoFunc(results);
        }
      },
    );
  });
};

const deleteTodo = (todoId: number): void => {
  databaseInstance.transaction((tx) => {
    tx.executeSql('delete from todos where id=?', [todoId], (_, results) => {
      if (results.rowsAffected > 0) console.log('success');
    });
  });
};

export const todoDatabase: TodoDatabase = {
  dropDatabaseTablesAsync,
  setupDatabaseAsync,
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
