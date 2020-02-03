const path = require("path");

const getConfig = env => {
  const plugins = [
    "@babel/plugin-proposal-class-properties",

    [
      "babel-plugin-inline-dotenv",
      {
        path: path.resolve(__dirname, "./.env"),
        systemVar: "overwrite"
      }
    ]
  ];

  const presets = [
    "@emotion/babel-preset-css-prop",

    "@babel/preset-typescript",

    "@babel/preset-react"
  ];

  if (process.env.NODE_ENV === "test") {
    plugins.push("@babel/plugin-transform-modules-commonjs");
  }

  return { plugins, presets };
};

module.exports = api => {
  /**
   * cache the config with this key
   */
  api.cache.invalidate(
    () => `${process.env.NODE_ENV || ""}.${process.env.BABEL_ENV || ""}`
  );

  return getConfig(api.env());
};

module.exports.getConfig = getConfig;
