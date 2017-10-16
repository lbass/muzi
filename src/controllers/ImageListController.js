'use strict';
import angular from 'angular';

class ImageListController {
  constructor($scope, ImageListService) {
    this.service = ImageListService;
    $scope.selectedImageInfo = {
      store_name: '',
      width: 0,
      height: 0,
      image_url: './phaserpreview.html',
      frame_width: 0,
      frame_count: 0
    };

    ImageListService.getImageList().then(
      function (response) {
        $scope.filelist = response.data;
      }
    );

    $scope.processFrameCount = function() {
      var frameWidth = $scope.selectedImageInfo.width / $scope.selectedImageInfo.frame_count;
      if(Number.isInteger(frameWidth)) {
        $scope.selectedImageInfo.frame_width = frameWidth;
      } else {
        $scope.selectedImageInfo.frame_width = -1;
      }
    };

    $scope.displaySprite = function(imageFile) {
      $scope.selectedImageInfo = {
        store_name: imageFile.store_name,
        width: imageFile.width,
        height: imageFile.height,
        image_url: "./phaserpreview.html?store_name=" + imageFile.store_name + "&width=" + imageFile.width + "&height=" + imageFile.height,
        frame_width: imageFile.frame_width,
        frame_count: imageFile.frame_count
      };
    };

    $scope.playAnimation = function() {
      var queryString = "ani=true" +
          "&store_name=" + $scope.selectedImageInfo.store_name +
          "&start_frame=" + $scope.selectedImageInfo.start_frame +
          "&end_frame=" + $scope.selectedImageInfo.end_frame +
          "&frame_width=" + $scope.selectedImageInfo.frame_width +
          "&height=" + $scope.selectedImageInfo.height +
          "&frame_count="+ $scope.selectedImageInfo.frame_count;
      $scope.selectedImageInfo.image_url = "./phaserpreview.html?" + queryString;
    };

    $scope.saveAnimationInfo = function() {
      var param = {
        store_name: $scope.selectedImageInfo.store_name,
        frame_width: $scope.selectedImageInfo.frame_width,
        frame_count: $scope.selectedImageInfo.frame_count
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

export default ImageListController;
