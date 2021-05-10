import {
  Theme as DefaultTheme,
  ThemeProvider as OriginalThemeProvider,
} from '@emotion/react';
import React, {useEffect, useState} from 'react';
import {ThemeType, dark, light} from '../theme';

import {Appearance} from 'react-native';
import createCtx from '../utils/createCtx';
import {useMediaQuery} from 'react-responsive';

interface Context {
  themeType: ThemeType;
  media: {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
  };
  theme: DefaultTheme;
  changeThemeType: () => void;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
  initialThemeType?: ThemeType;
}

const ThemeProvider: React.FC<Props> = ({children, initialThemeType}) => {
  const isMobile = useMediaQuery({maxWidth: 767});
  const isTablet = useMediaQuery({minWidth: 767, maxWidth: 992});
  const isDesktop = useMediaQuery({minWidth: 992});

  const [themeType, setThemeType] = useState(
    initialThemeType || ThemeType.LIGHT,
  );

  useEffect(() => {
    const listener = ({colorScheme}): void => {
      setThemeType(colorScheme === 'light' ? ThemeType.LIGHT : ThemeType.DARK);
    };

    Appearance.addChangeListener(listener);

    return () => {
      Appearance.removeChangeListener(listener);
    };
  }, []);

  const changeThemeType = (): void => {
    const newThemeType =
      themeType === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;

    setThemeType(newThemeType);
  };

  const defaultTheme = themeType === ThemeType.DARK ? dark : light;

  const media = {
    isMobile,
    isTablet,
    isDesktop,
  };

  const theme: DefaultTheme = {...defaultTheme, ...media};

  return (
    <Provider
      value={{
        media,
        themeType,
        changeThemeType,
        theme: defaultTheme,
      }}>
      <OriginalThemeProvider theme={theme}>{children}</OriginalThemeProvider>
    </Provider>
  );
};

export {useCtx as useTheme, ThemeProvider, ThemeType};
