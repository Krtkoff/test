/**
 * Created by Krtkoff on 6.12.2015.
 */
var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    spawn = require('child_process').spawn;


module.exports = function (options) {
    options = options || {};
    options.bin = options.bin || 'sass';
    options.src = path.resolve(options.src || 'public') + path.sep;
    options.dest = options.dest || options.src;
    options.quiet = options.quiet || false;
    options.cache_location = options.cache_location ?
        path.resolve(options.cache_location) : null;

    if (require('os').type() == 'Windows_NT' && !(options.bin.match(/\.bat$/))) {
        options.bin += '.bat';
    }

    var log = function (key, val, type) {
        var c;
        if (!options.quiet || type === 'error') {
            switch (type) {
                case 'log':
                case 'info':
                    c = '36m';
                    break;
                case 'error':
                    c = '31m';
                    break;
                case 'warn':
                    c = '33m';
                    break;
                default:
                    type = 'log';
            }

            console[type]('  \x1b[90m%s :\x1b[0m \x1b['+c+'%s\x1b[0m', key, val);
        }
    };

    var sassError = function (str) {
        log("Sass", str, 'error');
    };
    var sassLog = function (str) {
        log("Sass", str, 'log');
    };

    var update = function (src, cb) {
        var cmd = options.bin;
        var args = [];
        var opts = {
            cwd: process.cwd()
        };

        if (options.quiet) args.push('-q');
        if (options.cache_location) {
            args.push('--cache-location');
            args.push(options.cache_location);
        }
        if (options.style) {
            args.push('--style');
            args.push(options.style);
        }
        //args.push('--update');
        args.push(src);

        if (options.loadPath) {
            options.loadPath.forEach(function(p){
                args.push('--load-path');
                args.push(path.resolve(opts.cwd,p));
            });
        }

        var sass = spawn(cmd, args);
        var data = '';
        sassLog('Spawning `' + cmd + ' ' + args.join(' ') + '` in ' + opts.cwd);
        sass.stdout.on('data', function (chunk) {
            data += chunk.toString();
        });
        sass.stderr.on('data', function (data) {
            data.toString().split('\n').forEach(sassError);
        });
        sass.on('error', function (error) {
            cb(error);
        });
        sass.on('exit', function (code, signal) {
            if (code !== 0) {
                sassError('exit with code '+code+' by signal '+signal+' (src: '+src+')');
            } else {
                sassLog('exit with code '+code+' by signal '+signal);
            }
            cb(null, data);
        });
    };

    return function mw(req, res, next) {

        if (req.method != 'GET' && req.method != 'HEAD') { return next(); }

        var urlPath = url.parse(req.url).pathname;
        if (path.extname(urlPath) != '.css') { return next(); }


        var sourcePath = path.join(options.src, path.dirname(urlPath), path.basename(urlPath, '.css'));

        update(sourcePath, function(error, data) {
            if (error) {
                sassError(error.message);
                return next(error);
            }
            res.contentType('text/css');
            res.send(data);
        });
    };
};