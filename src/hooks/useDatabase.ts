// import React, {useEffect} from 'react';

// import {database} from '../utils/database';

// export default function useDatabase(): boolean {
//   const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

//   useEffect(() => {
//     async function loadDataAsync(): Promise<void> {
//       try {
//         await database.dropDatabaseTablesAsync();
//         await database.setupDatabaseAsync();
//         await database.setupTodosAsync();

//         setDBLoadingComplete(true);
//       } catch (e) {
//         console.warn(e);
//       }
//     }

//     loadDataAsync();
//   }, []);

//   return isDBLoadingComplete;
// }
