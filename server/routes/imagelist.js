import express from 'express';
import multiparty from 'multiparty';
import util from 'util';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/list', (req, res) => {
  const uploadDir = path.resolve(__dirname, './../../public/upload/files');
  let files = fs.readdirSync(uploadDir);
  let result = [];
  for(let i = 0 ; i < files.length; i++) {
    let file = files[i];
    if(file.lastIndexOf(".data") > 0) {
      let dataFile = path.resolve(uploadDir, file);
      let data = fs.readFileSync(dataFile, 'utf8');
      let imageData = JSON.parse(data); //now it an object
      let viewData = {
        name: imageData.file_name[0],
        size: imageData.file_size[0],
        width: imageData.image_width[0],
        height: imageData.image_heigth[0],
        store_name: imageData.store_name
      }
      result.push(viewData);
    }
  }
  console.info(result);
  res.status(200).json(result);
});

export default router;
