/**
 * Created by Muhsin on 14/05/2016.
 */


var myApp = angular.module('myApp', []);
myApp.controller('AppCtrllogin', ['$scope', '$http', '$window', 'loginService', function ($scope, $http, $window, loginService) {
    console.log("Hello World from controller");


    $scope.login = function (log) {
        console.log("Login Tried");
        console.log("Values : " + log.name + "  " + log.pass);
        $http.post('/login/', log).success(function (response) {
            console.log("login Successfull!!");
            loginService.update(response[0].u._id, response[0].u.properties.name, response[0].u.properties.number, response[0].u.properties.email);
            var data = loginService.get();
            console.log("id: ", data.UserID);
            $window.location.href = '/users.html';
        }).error(function (err) {
            console.log(err);
            alert("Please Enter a valid Username and Password");
            $window.location.reload();

        });
    };

}]);

myApp.controller('AppCtrl1', ['$scope', '$http', 'loginService', function ($scope, $http, loginService) {
    loginService.init();
    console.log("Hello World from controller");
    var data = loginService.get();
    console.log("id: ", data.UserID);
    var refresh = function () {
        var id = data.UserID;

        $http.get('/showAll', id).success(function (response) {
            console.log("get all is working!!");
            $scope.AllUser = response;
            console.log(JSON.stringify(response));
        });
        console.log("refreshed");
    };
    refresh();

    $scope.followUser = function (followid) {
        var id = {
            userID: data.UserID,
            followID: followid
        };
        $http.post('/showAll/', id).success(function (response) {
            console.log("Followed");
            refresh();
        });
    };

}]);

myApp.controller('AppCtrl2', ['$scope', '$http', 'loginService', function ($scope, $http, loginService) {
    loginService.init();
    var data = loginService.get();
    console.log("Hello World from controller");

    var refresh = function () {
        var id = data.UserID;

        $http.get('/showFollowed' , id).success(function (response) {

            console.log("get all is working!!");
            $scope.AllUser = response;
            console.log(JSON.stringify(response));
        });
        console.log("refreshed");
    };
    refresh();

    $scope.unfollowUser = function (unfollowid) {
        var id = {
            userID: data.UserID,
            unfollowID: unfollowid
        };
        $http.post('/showFollowed/', id).success(function (response) {
            console.log("UnFollowed");
            refresh();
        });
    };

}]);

myApp.controller('AppCtrl3', ['$scope', '$http', 'loginService', '$window', function ($scope, $http, loginService, $window) {
    loginService.init();
    var data = loginService.get();
    console.log("Hello World from controller");

    var refresh = function () {
        var id = data.UserID;
        $http.get('/showPosts' , id).success(function (response) {
            console.log("get all is working!!");
            $scope.AllPost = response;
            console.log(JSON.stringify(response));
        });
        console.log("refreshed");
    };
    refresh();

    $scope.addPost = function (text) {
        console.log("text to be added: ", text);
        var stuff = {
            text: text,
            userID: data.UserID,
            UserName: data.UserName
        };
        $http.post('/showPosts/', stuff).success(function (response) {
            console.log("text added!!");
            refresh();

        });
    };

    $scope.like = function (postID) {
        var stuff = {
            userID: data.UserID,
            postID: postID
        };
        $http.post('/like/', stuff).success(function (response) {
            console.log("liked!!");
            refresh();

        });


    }

}]);

myApp.factory('loginService', function () {

    var data = {};

    return {
        get: function () {
            return data
        },
        update: function (id, name, number, email) {
            data.UserID = id;
            data.UserName = name;
            data.UserNumber = number;
            data.UserEmail = email;
            sessionStorage["loginService"] = JSON.stringify(data);
        },

        init: function () {
            var temp = JSON.parse(sessionStorage["loginService"]);
            data.UserID = temp.UserID;
            data.UserName = temp.UserName;
            data.UserNumber = temp.UserNumber;
            data.UserEmail = temp.UserEmail;

        }
    };
});

