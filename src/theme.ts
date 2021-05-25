export const colors = {
  grey_10: '#F6F6F6',
  grey_20: '#F0F0F0',
  grey_30: '#DCDCDC',
  grey_40: '#D2D2D2',
  grey_50: '#B3B3B3',
  turquoise: '#00ADB5',
  pink: '#FC5185',
  light_dark: '#646F80',
  dark: '#222831',
  yellow: '#FFE12B',
  light_blue: '#DAF2FF',
  dark_blue: '#364F6B',
};

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const light = {
  background: colors.grey_10,
  header: colors.turquoise,
  listCard: colors.grey_20,
  title: colors.dark,
  text: colors.dark,
  placeholder: colors.grey_40,
  border: colors.dark,
  warning: colors.pink,
  icon: colors.turquoise,
  footer: colors.grey_30,
};

export const dark = {
  background: colors.dark,
  header: colors.light_blue,
  listCard: colors.grey_20,
  title: colors.grey_20,
  text: colors.dark,
  placeholder: colors.grey_40,
  border: colors.grey_20,
  warning: colors.pink,
  icon: colors.turquoise,
  footer: colors.grey_30,
};

export type DefautTheme = typeof light;

export const theme = {
  light,
  dark,
};
