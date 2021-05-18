module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      'module:metro-react-native-babel-preset',
      [
        '@babel/preset-react',
        {runtime: 'automatic', importSource: '@emotion/react'},
      ],
      'babel-preset-expo',
      '@babel/preset-typescript',
    ],
  };
};
