export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const light = {
  background: '#E5E5E5',
  titleText: 'rgba(0, 0, 0, 1)',
  subText: 'rgba(0, 0, 0, 0.69)',
  placeholder: 'rgba(186, 186, 186, 1)',
  icon: 'rgba(0, 0, 0, 1)',
  border: 'rgba(0, 0, 0, 0.69)',
};

export const dark = {
  background: 'rgba(49, 49, 49, 1)',
  titleText: 'rgba(216, 216, 216, 1)',
  subText: 'rgba(216, 216, 216, 0.69)',
  placeholder: 'rgba(186, 186, 186, 1)',
  icon: 'rgba(187, 187, 187, 1)',
  border: 'rgba(216, 216, 216, 0.69)',
};

export type DefautTheme = typeof light;

export const theme = {
  light,
  dark,
};
