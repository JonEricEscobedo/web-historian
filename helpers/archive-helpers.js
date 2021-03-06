var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, 'utf-8', function(err, text) {
    if (err) {
      throw err;
    }
    var urlList = text.split('\n');
    callback(urlList);
  }); 
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(this.paths.list, 'utf-8', function(err, text) {
    if (err) {
      throw err;
    }
    var urlList = text.split('\n');
    callback(urlList.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(this.paths.list, url, 'utf-8', function(err) {
    if (err) {
      throw err;
    }
    callback(url);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(this.paths.archivedSites + '/' + url, function(err) {
    if ( err ) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
  for ( var i = 0; i < urls.length; i ++ ) {
    fs.writeFile(this.paths.archivedSites + '/' + urls[i], '', function ( err ) {
      if ( err ) {
        throw err;
      }
    }); 
  }
};
