import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export const fetchSql = async <T>(
  sqlStatement: string,
  args: any[] | undefined,
): Promise<T[]> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        args,
        (_, result) => {
          resolve(Array.from(result.rows as any) as T[]);
        },
        (_, error): boolean => {
          console.warn(error);
          resolve([]);

          return false;
        },
      );
    });
  });
};

const getTodos = async (): Promise<any> =>
  await fetchSql('select * from todos', []);

export const database = {
  getTodos,
  // getTodos,
  // insertTodo,
  // setupDatabaseAsync,
  // setupTodosAsync,
  // dropDatabaseTablesAsync,
};
