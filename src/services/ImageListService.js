'use strict';

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

export default ImageListService;
