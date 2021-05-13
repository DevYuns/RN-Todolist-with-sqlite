import * as SQLite from 'expo-sqlite';
import {TodoType} from '../components/uis/Todo';

export interface TodoDatabase {
  createTodo?: (text: string, successFunc: any) => void;
  getAllTodos?: (setTodoFunc: any) => Promise<TodoType[]>;
  getTodo?: (id: string) => Promise<TodoType>;
  updateTodo?: (id: string) => Promise<void>;
  deleteTodo?: (id: string) => Promise<void>;

  setupDatabaseAsync?: any;
  setupTodoTestAsync?: any;
}

const databaseInstance: SQLite.Database | undefined = SQLite.openDatabase(
  'todos.db',
);

const getAllTodos = (setTodoFunc): any => {
  databaseInstance.transaction(
    (tx) => {
      tx.executeSql('select * from todos', [], (_, {rows: {_array}}) => {
        setTodoFunc(_array);
      });
    },
    () => console.log('db error load todos'),
    () => console.log('loaded todos'),
  );
};

const createTodo = (todoText, successFunc): void => {
  databaseInstance.transaction(
    (tx) => {
      tx.executeSql(
        'insert into todos (id ,text, isCompleted) values (?, ?, ?)',
        ['2', todoText, false],
      );
    },
    () => console.log('db error insertUser'),
    () => successFunc(),
  );
};

const setupDatabaseAsync = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    databaseInstance.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists todos (id string primary key not null, text text, isCompleted boolean)',
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

const setupTodoTestAsync = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    databaseInstance.transaction(
      (tx) => {
        tx.executeSql(
          'insert into todos(id, text, isCompleted) values(?, ?, ?)',
          ['10', 'todo text', false],
        );
      },
      (error) => {
        console.log(error, 'db error  insert test table');
        reject();
      },
      () => {
        console.log('loaded todos');
        resolve();
      },
    );
  });
};

async function getTodo(): Promise<TodoType> {
  return {id: '1', text: 'newTodo', iscompleted: false, isModalOpened: false};
}
async function updateTodo(): Promise<void> {}
async function deleteTodo(): Promise<void> {}

export const todoDatabase: TodoDatabase = {
  createTodo,
  getAllTodos,
  setupDatabaseAsync,
  setupTodoTestAsync,
  getTodo,
  updateTodo,
  deleteTodo,
};
