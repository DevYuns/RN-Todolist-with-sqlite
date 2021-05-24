export const colors = {
  grey_10: '#F6F6F6',
  grey_20: '#F0F0F0',
  grey_40: '#D2D2D2',
  turquoise: '#00ADB5',
  pink: '#FC5185',
  dark: '#222831',
  light_blue: '#DAF2FF',
  dark_blue: '#364F6B',
};

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const light = {
  background: colors.light_blue,
  header: colors.turquoise,
  listCard: colors.grey_20,
  text: colors.dark,
  placeholder: colors.grey_20,
  border: colors.dark,
  warning: colors.pink,
  icon: colors.turquoise,
};

export const dark = {
  background: colors.dark_blue,
  header: colors.turquoise,
  listCard: colors.grey_20,
  text: colors.grey_20,
  placeholder: colors.grey_20,
  border: colors.grey_20,
  warning: colors.pink,
  icon: colors.turquoise,
};

export type DefautTheme = typeof light;

export const theme = {
  light,
  dark,
};
