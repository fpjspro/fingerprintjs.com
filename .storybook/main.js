var path = require('path')

const resolvePath = (directoryName, pathName) => {
  const result = path.join(directoryName, pathName)
  if (process.platform === 'win32') {
    return result.replace(/\\/g, '\\\\')
  }

  return result
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
        },
        sassLoaderOptions: {
          implementation: require('sass'),
          additionalData: `@import "${resolvePath(path.resolve(__dirname, '..'), '/src/styles/common')}";`,
        },
      },
    },
  ],
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // use installed babel-loader
    config.module.rules[0].use[0].loader = require.resolve('babel-loader')
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
    ]
    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve('@babel/plugin-proposal-class-properties'),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve('babel-plugin-remove-graphql-queries'),
    ]
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ['browser', 'module', 'main']

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
        plugins: [
          require.resolve('@babel/plugin-proposal-class-properties'),
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve('babel-plugin-remove-graphql-queries'),
        ],
      },
    })
    config.resolve.extensions.push('.ts', '.tsx')

    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: [
    //     'style-loader',
    //     { loader: 'css-loader', options: { modules: true } },
    //     {
    //       loader: 'sass-loader',
    //       options: {
    //         implementation: require('sass'),
    //         additionalData: `@import "${resolvePath(path.resolve(__dirname, '..'), '/src/styles/common')}";`,
    //       },
    //     },
    //   ],
    //   include: path.resolve(__dirname, '../'),
    // })

    return config
  },
}
