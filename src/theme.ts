export const colors = {
  light: '#ffffff',
  dark: '#151A25',
  backgroundDark: '#151E22',
  deepDark: '#000000',
  red: '#D85963',
  blue_80: '#2F38C7',
  blue_70: '#1E6EFA',
  blue_60: '#217DFE',
  paleBlue_10: '#8bc9ff',
  paleBlue_05: '#e2f2ff',
  green_30: '#00D4AB',
  green_10: '#A1EEDB',
  gray_80: '#676c7a',
  gray_70: '#545966',
  gray_60: '#676c7a',
  gray_50: '#8f94a3',
  gray_40: '#AFB4C3',
  gray_30: '#d3d8e8',
  gray_05: '#f3f9ff',
};

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const light = {
  background: colors.light,
  titleText: colors.dark,
  subText: colors.blue_70,
  placeholder: colors.gray_60,
  icon: colors.blue_60,
  border: colors.blue_70,
  delete: colors.red,
};

export const dark = {
  background: colors.deepDark,
  titleText: colors.light,
  subText: colors.paleBlue_10,
  placeholder: colors.gray_50,
  icon: colors.paleBlue_10,
  border: colors.paleBlue_10,
  delete: colors.red,
};

export type DefautTheme = typeof light;

export const theme = {
  light,
  dark,
};
