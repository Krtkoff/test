/**
 * Created by Krtkoff on 6.12.2015.
 */
var fileList = require('../build.config.js'),
    grunt    = require('grunt');

var opt = {

};

exports.index = function(req, res){
    var vendor = {
            js: grunt.file.expand({cwd:fileList.vendor_dir}, fileList.vendor_files.js).map(prefix(fileList.vendor_dir+'/')),
            css: grunt.file.expand({cwd:fileList.vendor_dir}, fileList.vendor_files.css).map(prefix(fileList.vendor_dir+'/'))
        },
        app = {
            js: grunt.file.expand({cwd:fileList.app_dir}, fileList.app_files.js).map(prefix(fileList.app_dir + '/')),
            css: grunt.file.expand({cwd:fileList.app_dir}, fileList.app_files.sass).map(suffix('.css')).map(prefix(fileList.app_dir + '/'))
        };

    var templates = '<script>angular.module("templates-app",[]);angular.module("templates-common",[]);</script>';

    res.render('index', {
        title: 'Scrum Voting',
        additional_headers: templates,
        jsFiles: concat(vendor.js,app.js),
        cssFiles: concat(vendor.css, app.css)
    });
};

var concat = function(){
    return [].concat.apply([], arguments);
};
var suffix = function(suffix){
    return function(item){
        return item + suffix;
    };
};
var prefix = function(prefix){
    return function(item){
        return prefix + item;
    };
};
