import React from 'react';

import {ThemeProvider, ThemeType} from './ThemeProvider';
import {DatabaseProvider} from './DatabaseProvider';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

const RootProvider: React.FC<Props> = ({initialThemeType, children}) => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      <DatabaseProvider>{children}</DatabaseProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
