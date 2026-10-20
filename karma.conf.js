// - Framework de assertions, Jasmine (describe / it / expect).
// - Runner, Karma.
// - Navegador, jsdom (corre en Node, sin depender de Chrome instalado).
// - Preprocesador, karma-esbuild, que compila JSX/ESM con esbuild para que
//   Karma (que solo entiende scripts clasicos) pueda ejecutar los specs de React.
//
// Uso con npm test (una sola corrida)
//       npm run test:watch (modo interactivo)
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    // setup.js se carga antes que los specs; luego, todos los *.spec.js.
    // Los specs de React tambien llevan extension .js; el loader de
    // esbuild config abajo (.js -> jsx) permite escribir JSX dentro de ellos.
    files: [
      { pattern: 'test/setup.js', watched: false },
      { pattern: 'test/**/*.spec.js', watched: false },
    ],

    preprocessors: {
      'test/**/*.spec.js': ['esbuild'],
    },

    // Configuracion de esbuild que usa karma-esbuild.
    esbuild: {
      bundle: true,
      format: 'iife',
      platform: 'browser',
      target: 'es2020',
      jsx: 'automatic',
      sourcemap: 'inline',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      define: { 'process.env.NODE_ENV': '"test"' },
      // Cada spec se empaqueta por separado para evitar choques de nombres
      singleBundle: false,
    },

    reporters: ['progress'],

    browsers: ['jsdom'],

    singleRun: true,
    autoWatch: false,
    concurrency: 1,

    plugins: [
      require('karma-jasmine'),
      require('karma-jsdom-launcher'),
      require('karma-esbuild'),
    ],

    // silencia los warnings
    client: {
      captureConsole: false,
      jasmine: { random: false },
    },
  })
}
