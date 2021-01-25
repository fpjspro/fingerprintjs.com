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
    const [babelLoaderRule, ...rules] = config.module.rules
    const [babelLoaderUse, ...use] = babelLoaderRule.use

    const assetRule = config.module.rules.find(({ test }) => test.test('.svg'))
    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query,
    }

    return {
      ...config,
      resolve: {
        extensions: [...config.resolve.extensions, '.ts', '.tsx'],
        // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
        mainFields: ['browser', 'module', 'main'],
      },
      module: {
        rules: [
          { test: /\.svg$/, use: ['@svgr/webpack', assetLoader] },
          {
            ...babelLoaderRule,
            // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
            exclude: [/node_modules\/(?!(gatsby)\/)/],
            use: [
              {
                ...babelLoaderUse,
                // use installed babel-loader
                loader: require.resolve('babel-loader'),
                options: {
                  // use @babel/preset-react for JSX and env (instead of staged presets)
                  presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
                  plugins: [
                    // use @babel/plugin-proposal-class-properties for class arrow functions
                    require.resolve('@babel/plugin-proposal-class-properties'),
                    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
                    require.resolve('babel-plugin-remove-graphql-queries'),
                  ],
                },
              },
              ...use,
            ],
          },
          ...rules,
          {
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
          },
        ],
      },
    }
  },
}
