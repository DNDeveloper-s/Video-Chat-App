const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    auth: './public/assets/js/Auth/auth.js',
    dashboard: './public/assets/js/dashboard.js',
    room: './public/assets/js/Room/room.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
    filename: '[name].bundle.js'
  },
  watch: true
}