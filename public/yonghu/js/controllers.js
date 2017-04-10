angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    $scope.jump = function(url) {
            window.location = url;
    };
})

//用户登录控制
.controller('LoginCtrl', function($scope,$http) {
    $scope.info = {username:"",password:""};
    $scope.jump = function(url) {
            window.location = url;
     };
    $scope.submit = function(){
//        $scope.formData = {};
        var info = $scope.info;
        $http({
		method: 'POST',
		url: '/users/8/login.json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {"mobile":info.username,"encrypted_password":info.password},
            
        transformRequest: function(obj) {    
                var str = [];    
                for (var p in obj) {    
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));    
                }    
                return str.join("&");    
            }
	}).then(function successCallback(response) {
      //	$scope.names = response.data.sites;
            var ret = response.data.data;
            if (ret == "Login succ!") {
                alert("登录成功，跳转到主页面");
                window.location = "#/tab/dash";
            }
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

