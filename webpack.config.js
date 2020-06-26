const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CLIENT_DIR = path.join(__dirname, "./src/client");
const BUILD_DIR = path.join(__dirname, "./src/build");

module.exports = {
    entry: path.join(CLIENT_DIR, "index.tsx"), //Define the entry point for the project
    output: {   //Define where the compliation package would be placed
        filename: "bundle.js",
        path: BUILD_DIR
    },
    
    mode: "production",

    // Enable sourcemaps for debugging webpack's output.
    // http://blog.teamtreehouse.com/introduction-source-maps
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My first React app',
            template: path.join(CLIENT_DIR, "index.html")
          })
    ]
};
