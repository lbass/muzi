'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multiparty = require('multiparty');

var _multiparty2 = _interopRequireDefault(_multiparty);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var UPLOAD_DIR = _path2.default.resolve(__dirname, './../../public/upload/files');

router.post('/upload', function (req, res) {
  var form = new _multiparty2.default.Form({
    uploadDir: UPLOAD_DIR,
    maxFilesSize: 1024 * 1024 * 5 // 허용 파일 사이즈 최대치
  });

  form.parse(req, function (error, fields, files) {
    var splitFileName = files.file[0].path.split(".");
    var sFileName = splitFileName[0];
    var sFileExtension = splitFileName[1];
    var jsonData = {
      imageWidth: fields.imageWidth[0],
      imageHeigth: fields.imageHeigth[0],
      fileName: fields.fileName[0],
      fileSize: fields.fileSize[0],
      storeName: _path2.default.basename(files.file[0].path),
      frameCount: -1,
      frameWidth: null
    };
    var json = JSON.stringify(jsonData);
    _fs2.default.writeFile(sFileName + '.data', json, 'utf-8', function (err) {
      if (err) {
        return console.log(err);
      }
    });

    var result = {
      success: true,
      files: files
    };
    res.status(200).json(result);
  });
});

router.post('/update', function (req, res) {
  var param = req.body;
  var dataFileName = param.storeName.split(".")[0] + '.data';
  var imageData = getImageData(dataFileName);
  imageData['frameCount'] = param.frameCount;
  imageData['frameWidth'] = param.frameWidth;

  var json = JSON.stringify(imageData);
  _fs2.default.writeFileSync(UPLOAD_DIR + '/' + dataFileName, json, 'utf-8');
  var result = {
    success: true
  };
  res.status(200).json(result);
});

exports.default = router;


function getImageData(dataFileName) {
  var files = _fs2.default.readdirSync(UPLOAD_DIR);
  var result = {};
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (file.indexOf(dataFileName) > -1) {
      var data = _fs2.default.readFileSync(UPLOAD_DIR + '/' + dataFileName, 'utf8');
      result = JSON.parse(data);
      break;
    }
  }
  return result;
}