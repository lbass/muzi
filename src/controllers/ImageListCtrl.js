'use strict';
import angular from 'angular';

class ImageListCtrl {
  constructor($scope, ImageListService) {
    $scope.selectedImage = {
      storeName: '',
      width: 0,
      height: 0,
      imageUrl: './phaserPreview.html',
      frameWidth: 0,
      frameCount: 0
    };

    ImageListService.getImageList().then(
      function (response) {
        $scope.filelist = response.data;
      }
    );

    $scope.processFrameCount = function() {
      var frameWidth = $scope.selectedImage.width / $scope.selectedImage.frameCount;
      if(Number.isInteger(frameWidth)) {
        $scope.selectedImage.frameWidth = frameWidth;
      } else {
        $scope.selectedImage.frameWidth = -1;
      }
    };

    $scope.displaySprite = function(imageFile) {
      $scope.selectedImage = {
        storeName: imageFile.storeName,
        width: imageFile.width,
        height: imageFile.height,
        imageUrl: "./phaserPreview.html?storeName=" + imageFile.storeName + "&width=" + imageFile.width + "&height=" + imageFile.height,
        frameWidth: imageFile.frameWidth,
        frameCount: imageFile.frameCount
      };
    };

    $scope.playAnimation = function() {
      var queryString = "ani=true" +
          "&storeName=" + $scope.selectedImage.storeName +
          "&startFrame=" + $scope.selectedImage.startFrame +
          "&endFrame=" + $scope.selectedImage.endFrame +
          "&frameWidth=" + $scope.selectedImage.frameWidth +
          "&height=" + $scope.selectedImage.height +
          "&frameCount="+ $scope.selectedImage.frameCount;
      $scope.selectedImage.imageUrl = "./phaserPreview.html?" + queryString;
    };

    $scope.saveAnimationInfo = function() {
      var param = {
        storeName: $scope.selectedImage.storeName,
        frameWidth: $scope.selectedImage.frameWidth,
        frameCount: $scope.selectedImage.frameCount
      };
      ImageListService.updateImageInfo(param).then(
        function (response) {
          alert('저장되었습니다.');
          ImageListService.getImageList().then(
            function (response) {
              $scope.filelist = response.data;
            }
          );
        },
        function(response) {
          if (response.status > 0) {
            alert(response.status + ': ' + response.data);
          }
        }
      );
    };

  }
}

export default ImageListCtrl;
