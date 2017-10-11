'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularFileUpload from 'ng-file-upload';

angular.module('app', [uiRouter, angularFileUpload])
    .config(
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('imageupload', {
                url: '/imageupload',
                templateUrl: 'imageupload.html',
                controller: 'ImageUploadController'})
            .state('imagepreview', {
                url: '/imagepreview',
                templateUrl: 'imagepreview.html',
                controller: 'ImagePreviewController'})
            .state('imagelist', {
                url: '/imagelist',
                templateUrl: 'imagelist.html',
                controller: 'ImageListController'});
        }
    )
    .controller('ImageUploadController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
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
                      $scope.errorMsg = response.status + ': ' + response.data;
                    }
                  }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                  });
            });
        }
    }])
    .controller('ImageListController', ['$scope', 'ImageListService', function ($scope, ImageListService) {
        ImageListService.getImageList().then(
          function (response) {
            $scope.filelist = response.data;
            console.info($scope.filelist);
          }
        );
    }])
    .controller('ImagePreviewController', ['$scope', function($scope) {
        console.info(1);
    }])
    .service('ImageListService', function($http){
        var Service = {};
        Service.getImageList = function() {
          return $http ({
              method: 'GET',
              url: '/api/preview/list'
          });
        };
        return Service;
    });

angular.module('app', [uiRouter, angularFileUpload])
    .config(
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('imageupload', {
                url: '/imageupload',
                templateUrl: 'imageupload.html',
                controller: 'ImageUploadController'})
            .state('imagepreview', {
                url: '/imagepreview',
                templateUrl: 'imagepreview.html',
                controller: 'ImagePreviewController'})
            .state('imagelist', {
                url: '/imagelist',
                templateUrl: 'imagelist.html',
                controller: 'ImageListController'});
        }
    )
    .controller('ImageUploadController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
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
                      $scope.errorMsg = response.status + ': ' + response.data;
                    }
                  }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                  });
            });
        }
    }])
    .controller('ImageListController', ['$scope', 'ImageListService', function ($scope, ImageListService) {
        ImageListService.getImageList().then(
          function (response) {
            $scope.filelist = response.data;
          }
        );

        $scope.selectedImageInfo = {
          imageUrl: "./phaserpreview.html"
        }

        $scope.processFrameCount = function() {
          var frameWidth = $scope.selectedImageInfo.width / $scope.selectedImageInfo.frameCount;
          if(Number.isInteger(frameWidth)) {
            $scope.selectedImageInfo.frameWidth = frameWidth;
          } else {
            $scope.selectedImageInfo.frameWidth = -1;
          }
        }

        $scope.displaySprite = function(storeName, width, height) {
          $scope.selectedImageInfo = {
            storeName: storeName,
            width: width,
            height: height,
            imageUrl: "./phaserpreview.html?storeName=" + storeName + "&width=" + width + "&height=" + height
          };
        }

        $scope.playAnimation = function() {
          var queryString = "ani=true" +
              "&storeName=" + $scope.selectedImageInfo.storeName +
              "&startFrame=" + $scope.selectedImageInfo.startFrame +
              "&endFrame=" + $scope.selectedImageInfo.endFrame +
              "&frameWidth=" + $scope.selectedImageInfo.frameWidth +
              "&height=" + $scope.selectedImageInfo.height +
              "&frameCount="+ $scope.selectedImageInfo.frameCount;
          $scope.selectedImageInfo.imageUrl = "./phaserpreview.html?" + queryString;
        }
    }])
    .controller('ImagePreviewController', ['$scope', function($scope) {
        console.info(1);
    }])
    .service('ImageListService', function($http){
        var Service = {};
        Service.getImageList = function() {
          return $http ({
              method: 'GET',
              url: '/api/preview/list'
          });
        };
        return Service;
    });
