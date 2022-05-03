const path = require('path');

module.exports = {
    // Entry point is the modele that webpack uses to start building its internal dependency graph.
    entry: './src/index.js',
    // output property instructs webpack where to emit the bundle(s) and what name to use for the file(s)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // Define what's extensions webpack will work to
    resolve: {
        extensions: ['.js']
    }
}