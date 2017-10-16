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

      let viewData = imageDataToJson(imageData);
      result.push(viewData);
    }
  }
  res.status(200).json(result);
});

function imageDataToJson(imageData) {
  let result = {
    name: imageData.file_name[0],
    size: imageData.file_size[0],
    width: imageData.image_width[0],
    height: imageData.image_heigth[0],
    store_name: imageData.store_name
  };
  if(imageData.frame_width) {
    result['frame_width'] = imageData.frame_width;
    result['frame_count'] = imageData.frame_count;
  }
  return result;
}

export default router;
