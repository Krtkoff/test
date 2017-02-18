/**
 * Created by Krtkoff on 6.12.2015.
 */


module.exports = {

    app_dir:     'client/src',
    vendor_dir:  'client/vendor',

    app_files: {
        js: [ '**/*.module.js', '**/*.config.js', '**/*.js'],

        atpl: [ 'app/**/*.tpl.html' ],
        ctpl: [ 'common/**/*.tpl.html' ],

        index: [ 'index.html' ],
        sass: 'sass/main.scss'
    },

    vendor_files: {
        js: [
            'angular/angular.js',
            'angular-ui-router/release/angular-ui-router.js'
        ],
        css: [

        ],
        assets: [
        ]
    }
};