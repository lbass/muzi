'use strict';
import angular from 'angular';

class ImageUploadCtrl {
  constructor($scope, Upload, $timeout) {
    $scope.uploadFiles = function(files, errFiles) {
      console.info(11);
      $scope.files = files;
      $scope.errFiles = errFiles;
      angular.forEach(files, function(file) {
          file.upload = Upload.upload({
              url: '/api/preview/upload',
              method: 'POST',
              file: file,
              fields: {
                imageWidth: file.$ngfWidth,
                imageHeigth: file.$ngfHeight,
                fileName: file.name,
                fileSize: file.size
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

export default ImageUploadCtrl;
