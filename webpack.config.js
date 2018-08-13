const path = require('path');

const paths = {
  app: path.resolve(__dirname, 'src/js/'),
  styles: path.resolve(__dirname, 'src/scss/'),
  build: path.resolve(__dirname, 'build/'),
  template: path.resolve(__dirname, 'src/index.html')
};

const env = process.env.NODE_ENV || 'development';

