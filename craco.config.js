const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: [
            env === "development" &&
            require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          content: paths.appSrc + "/chrome-services/content.ts",
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
        plugins: [
          ...webpackConfig.plugins,
          new HtmlWebpackPlugin({
            inject: true,
            chunks: ["options"],
            template: paths.appHtml,
            filename: "options.html",
          }),
        ],
      };
    },
  },
};