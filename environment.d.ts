declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.json' {
  const content;
  export default content;
}

declare module '*.png' {
  const content;
  export default content;
}

declare module '*.ttf' {
  const content;
  export default content;
}

declare module 'react-native-switch-toggle' {
  const content;
  export default content;
}
