module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.tsx'],
        alias: {
          '~/components': './src/components',
          '~/functions': './src/functions',
          '~/procedures': './src/procedures',
          '~/utils': './src/utils',
          '~/navigations': './src/navigations',
          '~/screens': './src/screens',
        },
      },
    ],
  ],
}
