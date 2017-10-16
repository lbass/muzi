'use strict';
import angular from 'angular';

class ImageUploadController {
  constructor($scope, Upload, $timeout) {
    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/api/preview/upload',
                method: 'POST',
                file: file,
                fields: {
                  image_width: file.$ngfWidth,
                  image_heigth: file.$ngfHeight,
                  file_name: file.name,
                  file_size: file.size
                }
            });
            file.upload.then(
              function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
              },
              function (response) {
                if (response.status > 0) {
                  alert(response.status + ': ' + response.data);
                }
              }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
        });
    };
  }
}

export default ImageUploadController;
