'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularFileUpload from 'ng-file-upload';
import { ImageUploadController, ImageListController } from 'controllers';
import { ImageListService } from 'services';

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
    .controller('ImageUploadController', ['$scope', 'Upload', '$timeout', ImageUploadController])
    .controller('ImageListController', ['$scope', 'ImageListService', ImageListController])
    .controller('ImagePreviewController', ['$scope', function($scope) {
    }])
    .service('ImageListService', ImageListService);
