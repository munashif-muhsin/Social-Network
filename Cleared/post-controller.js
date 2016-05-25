/**
 * Created by Muhsin on 13/05/2016.
 */
/**
 * Created by Muhsin on 10/05/2016.
 */

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl3', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function () {
        $http.get('/showPosts').success(function (response) {
            console.log("get all is working!!");
            $scope.AllPost = response;
            console.log(JSON.stringify(response));
        });
        console.log("refreshed");
    };
    refresh();

    $scope.addPost = function (text) {
        console.log("text to be added: ", text);
        $http.post('/showPosts/' +text).success(function (response) {
            console.log("text added!!");
            refresh();
        });
    };

}]);