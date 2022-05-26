const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const mode = {
  production: 'production',
  development: 'development',
}

const entry = {
  content: './src/content.tsx',
  options: './src/options.tsx',
  background: './src/background.ts',
}

const rules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'ts-loader'
    },
  },
]

const resolve = {
  alias: {
    '~': path.resolve(__dirname, 'src'),
  },
  extensions: ['.tsx', '.ts', '.js'],
}

const devtool = 'inline-source-map'

const devServer = (index) => {
  return {
    historyApiFallback: {
      index
    }
  }
}

module.exports = (env, argv) => {

  if(argv.mode === mode.development && env.entry === entry.content) {
    return {
      devtool,
      resolve,
      devServer: devServer('content.html'),
      module: { rules },

      entry: {
        content: './src/content.dev.tsx',
        background: './src/background.dev.ts',
      },

    }
  }

  if(env.mode === mode.development) {
    return {
      entry: {
        content: './src/content.dev.tsx',
        background: './src/background.dev.ts',
      },
      resolve,
      module: { rules },
      optimization:{
        minimize: true
      },

      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: 'public'
            },
          ],
        }),
      ],
    }
  }

  if(argv.mode === mode.production) {
    return {
      entry,
      resolve,
      module: { rules },

      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: 'public'
            },
          ],
        }),
      ],
    }
  }

}
