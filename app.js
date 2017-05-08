/* シンプルなwebserver */

// サーバーがListenするIPアドレス
var LISTEN_IP = 'localhost';
// サーバがListenするポート
var LISTEN_PORT = 3030;
// ファイル名が指定されない場合に返す既定のファイル名
var DEFAULT_FILE = "default.html";
// 公開するディレクトリのルート
var DOCUMENT_ROOT = __dirname + '/public/'

var http = require('http');
var fs = require('fs');
var server = http.createServer();

// 拡張子を抽出
function getExtension(fileName) {
  var fileNameLength = fileName.length;
  var dotPoint = fileName.indexOf('.', fileNameLength - 5);
  var extn = fileName.substring(dotPoint + 1, fileNameLength);
  return extn;
}

// content-type を指定
function getContentType(fileName) {
  var extentsion = getExtension(fileName).toLowerCase();
  var contentType = {
    'html': 'text/html',
    'htm': 'text/htm',
    'css': 'text/css',
    'js': 'text/javaScript; charset=utf-8',
    'json': 'application/json; charset=utf-8',
    'xml': 'application/xml; charset=utf-8',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'gif': 'image/gif',
    'png': 'image/png',
    'mp3': 'audio/mp3',
  };
  var contentType_value = contentType[extentsion];
  if (contentType_value === undefined) {
    contentType_value = 'text/plain';
  };

  return contentType_value;
}

// Web サーバーのロジック
server.on('request',
  function(request, response) {
    console.log('Requested Url:' + request.url);
    var requestedFile = request.url;
    requestedFile = (requestedFile.substring(requestedFile.length - 1, 1) === '/') ? requestedFile + DEFAULT_FILE : requestedFile;
    console.log('Handle Url:' + requestedFile);
    console.log('File Extention:' + getExtension(requestedFile));
    console.log('Content-Type:' + getContentType(requestedFile));
    // DOCUMENT_ROOT以下のファイルにアクセス可能
    fs.readFile(DOCUMENT_ROOT + requestedFile, 'binary', function(err, data) {
      if (err) {
        response.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        response.write('not found !\n');
        response.end();
      } else {

        response.writeHead(200, {
          'Content-Type': getContentType(requestedFile)
        });
        response.write(data, "binary");
        response.end();

      }
    });
  }
);

server.listen(LISTEN_PORT);
console.log('Server running at http://' + LISTEN_IP + ':' + LISTEN_PORT);
