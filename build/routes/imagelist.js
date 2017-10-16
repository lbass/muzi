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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/list', function (req, res) {
  var uploadDir = _path2.default.resolve(__dirname, './../../public/upload/files');
  var files = _fs2.default.readdirSync(uploadDir);
  var result = [];
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (file.lastIndexOf(".data") > 0) {
      var dataFile = _path2.default.resolve(uploadDir, file);
      var data = _fs2.default.readFileSync(dataFile, 'utf8');
      var imageData = JSON.parse(data); //now it an object

      var viewData = imageDataToJson(imageData);
      result.push(viewData);
    }
  }
  res.status(200).json(result);
});

function imageDataToJson(imageData) {
  var result = {
    name: imageData.file_name[0],
    size: imageData.file_size[0],
    width: imageData.image_width[0],
    height: imageData.image_heigth[0],
    store_name: imageData.store_name
  };
  if (imageData.frame_width) {
    result['frame_width'] = imageData.frame_width;
    result['frame_count'] = imageData.frame_count;
  }
  return result;
}

exports.default = router;