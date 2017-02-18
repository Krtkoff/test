/**
 * Created by Krtkoff on 6.12.2015.
 */
var fs   = require('fs'),
    url  = require('url'),
    path = require('path');

module.exports = function (root, end) {

    if (!root) {
        throw new TypeError('root path required');
    }

    return function (req, res, next) {
        if ('GET' != req.method && 'HEAD' != req.method) return next();
        var filePath = url.parse(req.url).pathname;

        if (path.extname(filePath) !== '.html' ||
            path.extname(path.basename(filePath, '.html')) !== '.tpl') {
            return next();
        }

        // No <base> tag defined
        //var from = url.parse( path.dirname(req.headers.referer + 'a') ).pathname;
        //filePath = path.join(root, path.relative(from, filePath));

        // <base> tag defined
        filePath = path.join(root, filePath);

        fs.readFile(filePath, function(err, tpl){
            if (err && end) {
                res.status(404);
                return res.send();
            }
            if (err) {
                return next();
            }

            res.set('Content-Type', 'text/html');
            res.send(tpl);

        });

    };

};