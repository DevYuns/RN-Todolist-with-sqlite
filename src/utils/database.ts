import * as SQLite from 'expo-sqlite';

/* createdAt 과 completedAt 으로 비교해서 완료 비교. 토글을 위해서는 null값으로 줬다가 새로 시간줬다가 하기*/
export type DBTodoType = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export type GetAllTodosFunc = (results: DBTodoType[]) => void;
export type GetTodoFunc = (todo: DBTodoType) => void;
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
  toggleCompletedState?: (
    id: number,
    isCompleted: boolean,
    toggleTodoFunc: any,
  ) => void;
  deleteTodo?: (id: number, deleteTodo: any) => void;

  dropDatabaseTablesAsync?: any;
  setupDatabaseAsync?: any;
}

const databaseInstance: SQLite.Database | undefined = SQLite.openDatabase(
  'todos.db',
);

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
        console.log('Set up database successed');
        resolve();
      },
    );
  });
};

const getAllTodos = (getAllTodosFunc: GetAllTodosFunc): void => {
  databaseInstance.transaction((tx) => {
    tx.executeSql(
      'select * from todos',
      [],
      (_, results: SQLite.SQLResultSet) => {
        let temp: any = [];

        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));

        getAllTodosFunc(temp);
      },
    );
  });
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
      (_, results: SQLite.SQLResultSet) => {
        if (results.rowsAffected > 0) getAllTodos(createTodoFunc);
      },
    );
  });
};

const toggleCompletedState = (
  todoId: number,
  isCompleted: boolean,
  toggleTodoFunc,
): void => {
  databaseInstance.transaction((tx) => {
    tx.executeSql(
      'update todos set isCompleted=? where id=?',
      [isCompleted, todoId],
      (_, results) => {
        if (results.rowsAffected > 0) getAllTodos(toggleTodoFunc);
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
        if (results.rowsAffected > 0) getAllTodos(updateTodoFunc);
      },
    );
  });
};

const deleteTodo = (todoId: number, deleteTodoFunc): void => {
  databaseInstance.transaction((tx) => {
    tx.executeSql('delete from todos where id=?', [todoId], (_, results) => {
      if (results.rowsAffected > 0) getAllTodos(deleteTodoFunc);
    });
  });
};

export const todoDatabase: TodoDatabase = {
  setupDatabaseAsync,
  createTodo,
  getAllTodos,
  getTodo,
  toggleCompletedState,
  updateTodo,
  deleteTodo,
};
