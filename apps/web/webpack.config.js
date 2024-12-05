module.exports = {
  // ... other config
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      // Add other React Native package aliases as needed
      'react-native-reanimated': 'react-native-reanimated/lib/module/web',
      '@react-native': '@react-native-web'
    },
    extensions: ['.web.js', '.js', '.web.tsx', '.tsx', '.web.ts', '.ts'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(react-native-reanimated|react-native-gesture-handler)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              ['@babel/preset-env', { 
                targets: { 
                  browsers: ['last 2 versions', 'not dead', 'not ie 11']
                },
                modules: false
              }]
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-typescript'
            ]
          }
        }
      },
      {
        test: /\.css\.ts$/,
        use: [
          {
            loader: '@vanilla-extract/webpack-plugin/loader',
            options: {
              eslint: false
            }
          }
        ]
      }
    ]
  }
} 