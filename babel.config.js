const path = require('path');

const fbtEnumPath = path.join(
  __dirname,
  'src/utils/i18n/fbt/.enum_manifest.json',
);

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
    plugins: [
      'babel-plugin-fbt-runtime',
      [
        'babel-plugin-fbt',
        {
          fbtEnumPath,
          extraOptions: {__self: true},
        },
      ],
    ],
  };
};
