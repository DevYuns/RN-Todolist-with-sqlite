import '@emotion/react';
import type {DefautTheme} from './theme';

declare module '@emotion/react' {
  export interface Theme extends DefautTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
