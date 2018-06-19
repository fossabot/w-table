let sass = require('@stencil/sass');

exports.config = {
  namespace: 'w-table',
  outputTargets:[
    { 
      type: 'dist' 
    },
    { 
      type: 'www',
      serviceWorker: false
    }
  ],
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
