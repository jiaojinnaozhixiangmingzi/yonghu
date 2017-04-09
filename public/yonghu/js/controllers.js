angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    $scope.jump = function(url) {
            window.location = url;
    };
})

//用户登录控制
.controller('LoginCtrl', function($scope,$http) {
    $scope.username = 'wangaxing';
    $scope.jump = function(url) {
            window.location = url;
     };
    $scope.submit = function(){
        alert("zheshi");
//        alert($scope.username);
        $http({
		method: 'GET',
		url: 'http://127.0.0.1:3001/workers.json'
	}).then(function successCallback(response) {
//			$scope.names = response.data.sites;
            var ret = response;
		}, function errorCallback(response) {
			// 请求失败执行代码
            alert("请求失败了");
	});
    }
    
    $scope.settings = {
    enableFriends: true
  };
})

.controller('SigninCtrl', function($scope) {
    $scope.jump = function(url) {
            window.location = url;
    };
})

.controller('FindPasswdCtrl', function($scope) {
    $scope.jump = function(url) {
            window.location = url;
    };
//    $scope.username = 'wangaxing';
//  $scope.settings = {
//    enableFriends: true
//  };
})

.controller('ResetPasswdCtrl', function($scope, $http, $stateParams) {
    $scope.jump = function(url) {
            window.location = url;
    };
    var url = $stateParams.from; 
//    alert(url);
//    $scope.username = 'wangaxing';
//  $scope.settings = {
//    enableFriends: true
//  };
})



.controller('ShowProductCtrl', function($scope) {
    $scope.jump = function(url) {
            window.location = url;
    };
//    alert('www');
//    $scope.username = 'wangaxing';
//  $scope.settings = {
//    enableFriends: true
//  };
})
.controller('ZhuCtrl', function($scope) {
    var sss = $scope.myVar;
    $scope.myVar = true;
//    alert('www');
//    $scope.username = 'wangaxing';
//  $scope.settings = {
//    enableFriends: true
//  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chatss = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
//    $scope.jump = function(url) {
//            window.location = url;
//    };
  $scope.settings = {
    enableFriends: true
  };
});

