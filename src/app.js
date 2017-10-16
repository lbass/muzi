'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularFileUpload from 'ng-file-upload';
import { ImageUploadCtrl, ImageListCtrl } from 'controllers';
import { ImageListService } from 'services';

angular.module('app', [uiRouter, angularFileUpload])
    .config(
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('previewUpload', {
                url: '/preview/upload',
                templateUrl: './directives/imageUpload.html',
                controller: 'ImageUploadCtrl'})
            .state('previewList', {
                url: '/preview/list',
                templateUrl: './directives/imageList.html',
                controller: 'ImageListCtrl'});
        }
    )
    .controller('ImageUploadCtrl', ['$scope', 'Upload', '$timeout', ImageUploadCtrl])
    .controller('ImageListCtrl', ['$scope', 'ImageListService', ImageListCtrl])
    .service('ImageListService', ImageListService);
