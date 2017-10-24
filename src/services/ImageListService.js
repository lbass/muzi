'use strict';
import angular from 'angular';

class ImageListService {
  constructor($http) {
    this.$http = $http;
  }

  getImageList() {
    return this.$http ({
        method: 'GET',
        url: '/api/preview/list'
    });
  }

  updateImageInfo(param) {
    return this.$http ({
        method: 'POST',
        url: '/api/preview/update',
        data: param
    });
  }
}

ImageListService.$inject = ['$http'];
export default ImageListService;
