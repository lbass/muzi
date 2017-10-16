import express from 'express';
import multiparty from 'multiparty';
import util from 'util';
import path from 'path';
import fs from 'fs';
import querystring from 'querystring';

const router = express.Router();
const UPLOAD_DIR = path.resolve(__dirname, './../../public/upload/files');

router.post('/upload', (req, res) => {
  let form = new multiparty.Form({
      uploadDir: UPLOAD_DIR,
      maxFilesSize: 1024 * 1024 * 5 // 허용 파일 사이즈 최대치
  });

  form.parse(req, (error, fields, files) => {
    let splitFileName = files.file[0].path.split(".");
    let sFileName = splitFileName[0];
    let sFileExtension = splitFileName[1];
    fields.store_name = path.basename(files.file[0].path);

    let json = JSON.stringify(fields);
    fs.writeFile(sFileName + '.data', json, 'utf-8', function(err) {
      if(err) {
        return console.log(err);
      }
    });

    let result = {
      success: true,
      files: files
    }
    res.status(200).json(result);
  });
});

router.post('/update', (req, res) => {
  let param = req.body;
  let dataFileName = param.store_name.split(".")[0] + '.data';
  let imageData = getImageData(dataFileName);
  imageData['frame_count'] = param.frame_count;
  imageData['frame_width'] = param.frame_width;

  let json = JSON.stringify(imageData);
  fs.writeFileSync(UPLOAD_DIR + '/' + dataFileName, json, 'utf-8');
  let result = {
    success: true
  };
  res.status(200).json(result);
});

export default router;

function getImageData(dataFileName) {
  let files = fs.readdirSync(UPLOAD_DIR);
  let result = {};
  for(let i = 0 ; i < files.length; i++) {
    let file = files[i];
    if(file.indexOf(dataFileName) > -1) {
      let data = fs.readFileSync(UPLOAD_DIR + '/' + dataFileName, 'utf8');
      result = JSON.parse(data);
      break;
    }
  }
  return result;
}
