function CreateLectureCtrl($scope, $http, $location, $window, Lecture, $filter) {
    $scope.lecture = {};
    var self = this;
    $scope.lectures = Lecture.query();

    $scope.submitForm = function() {
    $http({
      method  : 'POST',
      url     : '/api/lectures',
      data    : { data: $scope.lecture }
     })
      .success(function(data) {
          $scope.lecture = data.lecture;
          if (data.id === null) {
            var video_id = data.video_id
            var found = $filter('filter')($scope.lectures, {video_id: video_id}, true);
            $window.location.href = '/#/lectures/' + found[0].id;
          } else {
            $location.path('/lectures/' + data.id)
          }
        })
    };
};

CreateLectureCtrl.$inject = ['$scope', '$http', '$location', '$window', 'Lecture', '$filter'];

angular.module('Flatcasts').controller('CreateLectureCtrl', CreateLectureCtrl);
