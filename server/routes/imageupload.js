import express from 'express';
import multiparty from 'multiparty';
import util from 'util';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.post('/upload', (req, res) => {
  const uploadDir = path.resolve(__dirname, './../../public/upload/files');
  let form = new multiparty.Form({
      uploadDir: uploadDir,
      maxFilesSize: 1024 * 1024 * 5 // 허용 파일 사이즈 최대치
  });
  form.parse(req, (error, fields, files) => {
    let splitFileName = files.file[0].path.split(".");
    let sFileName = splitFileName[0];
    let sFileExtension = splitFileName[1];
    fields.store_name = path.basename(files.file[0].path);

    var json = JSON.stringify(fields);
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

export default router;
