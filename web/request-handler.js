var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // if (req.method === 'GET') {
  //   if (req.url === '/') {
  //     var filePath = path.join(__dirname, req.url + 'public/index.html');
  //   }
  //   // console.log(filePath)
  //   //console.log('!!!!!!!!!!', req.url);
  //   //var content;
  // fs.readFile(filePath, "utf-8", function(err, html) {
  //   if (err) {
  //     //throw err;
  //     console.log(err)
  //   } else {
  //     // console.log('Success FUCK YEAH!!!!!!!!!!!')
  //     console.log('html', html);
  //     // console.log('html stringified', JSON.stringify(html));
  //     res.writeHead(200, httpHelper.headers);
  //     res.write(html)
  //     res.end(html);
  //   }
  // })
  // //console.log("Wat", content);
  // res.writeHead(200, httpHelper.headers);
  // res.end();
  // // do something
  // }
  var filePath = path.join(__dirname, req.url + 'public/index.html');
  fs.readFile(filePath, 'utf-8', function(err,html) {
    if ( err) {
      throw err;
    }
    res.writeHeader(200, httpHelper.headers);
    res.write(html);
    res.end();
  })
  //res.end(JSON.stringify(filePath));
  //res.end(archive.paths.list);
};
