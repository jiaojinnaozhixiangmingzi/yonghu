angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {
    $scope.jump = function (url) {
        window.location = url;
    };
})

//用户登录控制
.controller('LoginCtrl', function ($scope, $http, Login, httpService) {
    $scope.info = {
        mobile: "",
        encrypted_password: ""
    };
    $scope.jump = function (url) {
        window.location = url;
    };
    $scope.submit = function () {
        //        $scope.formData = {};
        var info = $scope.info;
        var checkRet = Login.checkFiled(info);
        //        var checkRet = inputFieldCheck(info);
        if (checkRet != null) {
            alert(checkRet);
            return;
        }
        httpService.posthttp(info);
        

    }

    $scope.settings = {
        enableFriends: true
    };
})

//function inputFieldCheck(userInfo) {
//    if (userInfo.username == null || userInfo.username == undefined || userInfo.username == ""){
//        return "validUsername";
//    }
//    if (userInfo.password == null || userInfo.password == undefined || userInfo.password == ""){
//        return "validPassword";     
//    }
//    return;
//};
.controller('SigninCtrl', function ($scope) {
    $scope.jump = function (url) {
        window.location = url;
    };
})

.controller('FindPasswdCtrl', function ($scope) {
    $scope.jump = function (url) {
        window.location = url;
    };
    //    $scope.username = 'wangaxing';
    //  $scope.settings = {
    //    enableFriends: true
    //  };
})

.controller('ResetPasswdCtrl', function ($scope, $http, $stateParams) {
    $scope.jump = function (url) {
        window.location = url;
    };
    var url = $stateParams.from;
    //    alert(url);
    //    $scope.username = 'wangaxing';
    //  $scope.settings = {
    //    enableFriends: true
    //  };
})



.controller('ShowProductCtrl', function ($scope) {
        $scope.jump = function (url) {
            window.location = url;
        };
        //    alert('www');
        //    $scope.username = 'wangaxing';
        //  $scope.settings = {
        //    enableFriends: true
        //  };
    })
    .controller('ZhuCtrl', function ($scope) {
        var sss = $scope.myVar;
        $scope.myVar = true;
        //    alert('www');
        //    $scope.username = 'wangaxing';
        //  $scope.settings = {
        //    enableFriends: true
        //  };
    })

.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chatss = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    //    $scope.jump = function(url) {
    //            window.location = url;
    //    };
    $scope.settings = {
        enableFriends: true
    };
});