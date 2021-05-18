import React from 'react';

import {ThemeProvider, ThemeType} from './ThemeProvider';
import {TodosProvider} from './TodosProvider';

interface Props {
  initialThemeType?: ThemeType;
  children: React.ReactElement;
}

const RootProvider: React.FC<Props> = ({initialThemeType, children}) => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      <TodosProvider>{children}</TodosProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
