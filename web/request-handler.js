var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

var post = [ {url: 'www.example.com'}];
    // req.on('data', function (data) {
    //     console.log('data', data);
    //     body += data;
    // });
    // req.on('end', function () {
    //     post.push(JSON.parse(body));
    // });
    // console.log("post", post);
    // console.log('url', post[0].url);
    // fs.writeFile(archive.paths.list, post[0].url, 'utf-8', function(err) {
    //   if ( err ) {
    //     throw err;
    //   }
    //   res.writeHeader(302, httpHelper.headers);
    //   res.end();
    // });

exports.handleRequest = function (req, res) {
  if (req.method === 'GET' && req.url !== '/') {
    archive.isUrlArchived(req.url, function(boolean) { 
      if (boolean) {
        fs.readFile(archive.paths.archivedSites + req.url, 'utf-8', function(err, html) {
          if (err) {
            throw err;
          }
          res.writeHead(200, httpHelper.headers);
          res.end(html);
        });
      } else {
        res.writeHead(404, httpHelper.headers);
        res.end();
      }
    });
    
  } else if (req.method === 'GET') {
    if (req.url === '/') {
      var filePath = archive.paths.siteAssets + '/index.html';
    } else {
      filePath = archive.paths.archivedSites + req.url;
    }
    fs.readFile(filePath, 'utf-8', function(err, html) {
      if (err) {
        throw err;
      }
      // console.log(html);
      res.writeHead(200, httpHelper.headers);
      res.end(html);
    });
  }
  // res.end(archive.paths.siteAssets + '/index.html');
};