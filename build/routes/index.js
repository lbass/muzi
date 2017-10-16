'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _imageupload = require('./imageupload');

var _imageupload2 = _interopRequireDefault(_imageupload);

var _imagelist = require('./imagelist');

var _imagelist2 = _interopRequireDefault(_imagelist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use('/preview', _imageupload2.default);
router.use('/preview', _imagelist2.default);
exports.default = router;