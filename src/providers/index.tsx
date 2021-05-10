import React from 'react';

import {ThemeProvider, ThemeType} from '../providers/ThemeProvider';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

const RootProvider: React.FC<Props> = ({initialThemeType, children}) => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      {children}
    </ThemeProvider>
  );
};

export default RootProvider;
