var glob = require('glob')
var fs = require('fs')
var fp = require('path')

function ensureDirectoryExistence(filePath) {
    var dirname = fp.dirname(filePath);
    if (directoryExists(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function directoryExists(path) {
    try {
        return fs.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
}

glob("./src/**/*.@(le|c)ss", function (e, files) {
    files.map(function (path) {
        var source = fs.createReadStream(path);
        var dest = path.replace(/^.\/src\/(.*)/, function (match, rest) {
            return fp.join(__dirname, './lib', rest)
        });
        ensureDirectoryExistence(dest);
        source.pipe(fs.createWriteStream(dest))
    })
})
