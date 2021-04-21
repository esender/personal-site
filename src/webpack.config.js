var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var AssetsPlugin = require("assets-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    styles: "./css/index.css",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      autoprefixer: { grid: true },
                      stage: 0,
                      importFrom: [
                        {
                          customMedia: {
                            "--mobile-medium": "(width >= 360px)",
                            "--small-tablet": "(width >= 660px)",
                            "--tablet": "(width >= 768px)",
                            "--desktop": "(width >= 1024px)",
                          },
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "./../static/dist"),
    filename: "js/[name].[chunkhash].js",
  },
  resolve: {
    modules: [path.resolve(__dirname, "src")],
  },
  plugins: [
    new AssetsPlugin({
      filename: "webpack_assets.json",
      path: path.join(__dirname, "../data"),
      prettyPrint: true,
      removeFullPathAutoPrefix: true,
    }),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV === "development"
          ? "css/[name].css"
          : "css/[name].[chunkhash].css",
    }),
  ],
};
