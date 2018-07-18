const plugins = [
  [
    'babel-plugin-transform-inline-environment-variables',
    {
      include: [
        //
        'NODE_ENV',
        'VERSION',
        'GEODB_USER_TOKEN',
        'GEODB_API_KEY',
        'GMAP_API_KEY',
      ],
    },
  ],

  'babel-plugin-emotion',

  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
]

const presets = ['@babel/preset-react']

if (process.env.NODE_ENV === 'production') {
  presets.push('@babel/preset-env')
  plugins.push([
    '@babel/plugin-transform-runtime',
    {
      helpers: false,
      polyfill: false,
      regenerator: true,
      moduleName: '@babel/runtime',
    },
  ])
}

module.exports = { plugins, presets }
