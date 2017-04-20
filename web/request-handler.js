var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

var post = [ {url: "www.example.com"}];

exports.handleRequest = function (req, res) {

  if ( req.method === 'POST') {
    var body = '';
    req.on('data', function (data) {
        console.log('data', data);
        body += data;
    });
    req.on('end', function () {
        post.push(JSON.parse(body));
    });
    console.log("post", post);
    console.log('url', post[0].url);
    fs.writeFile(archive.paths.list, post[0].url, 'utf-8', function(err) {
      if ( err ) {
        throw err;
      }
      res.writeHeader(302, httpHelper.headers);
      res.end();
    });
  } else if ( req.method == 'GET' ) {
    if ( req.url === '/') {
      var filePath = path.join(__dirname, req.url + 'public/index.html');
    } else {
      filePath = archive.paths.list;
    }
    fs.readFile(filePath, 'utf-8', function(err,html) {
      if ( err) {
        throw err;
      }
      res.writeHeader(200, httpHelper.headers);
      res.end(html);
    })
  }

  if (req.method === 'GET' && req.url !== '/') {
    // Search archives
    filePath = archive.paths.list
    // call fsReadfile on list of sites
    fs.readFile(filePath, 'utf-8', function(err, html) {
      if (err) {
        res.writeHeader(404, httpHelper.headers);
        res.end();
        throw err;
      }
      // examine contents of file
      // if match is found == req.url
        // return content of the site
      // else
        // do something
      //console.log('original html', html)
      //console.log('stringified html', JSON.stringify(html));
      res.writeHeader(200, httpHelper.headers);
      res.end(html);
    });
  }
  // res.end(JSON.stringify(filePath));
  // res.end(archive.paths.list);
};
