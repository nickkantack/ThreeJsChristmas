const path = require('path');

module.exports = {
  entry: './src/main.ts', // Entry point of your application
  output: {
    filename: 'main.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    extensions: ['.ts', '.js'], // Allow importing .ts and .js files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match TypeScript files
        use: 'ts-loader', // Use ts-loader to compile them
        exclude: /node_modules/, // Exclude node_modules
      },
    ],
  },
  mode: "production"
};