// import {useEffect, useState} from 'react';

// export default function useDatabase(): boolean {
//   const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);

//   useEffect(() => {
//     async function loadDataAsync(): Promise<void> {
//       try {
//         await todoDB.dropDatabaseTablesAsync();
//         await todoDB.setupDatabaseAsync();
//         await todoDB.setupTodosAsync();

//         setDBLoadingComplete(true);
//       } catch (e) {
//         console.warn(e);
//       }
//     }

//     loadDataAsync();
//   }, []);

//   return isDBLoadingComplete;
// }
