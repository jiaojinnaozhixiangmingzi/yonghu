angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {
    $scope.jump = function (url) {
        window.location = url;
    };
})

//用户登录控制
.controller('LoginCtrl', function ($scope, $http, Login, httpServicePost, $rootScope) {
    $scope.info = {
        mobile: "",
        encrypted_password: ""
    };
    $scope.jump = function (url) {
        window.location = url;
    };
    $scope.showerror = false;
    $scope.submit = function () {
        $rootScope.userid = '186';
        var info = $scope.info;
        var checkRet = Login.checkFiled(info);
        if (checkRet != null) {
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(info, '/users/8/login.json').then(function (resp) {
            if (resp.data.data == "Login succ!") {
                alert("登录成功");
                userid = '186';
                window.location = "#/tab/dash";
            }
            //响应成功时调用，resp是一个响应对象
        });

    }

    $scope.settings = {
        enableFriends: true
    };
})

.controller('SigninCtrl', function ($scope, Signin, httpServicePost) {
    $scope.info = {
        mobile: "",
        encrypted_password: "",
        reencrypted_password: ""
    };

    $scope.showerror = false;
    $scope.submit = function () {
        var info = $scope.info;
        var userinfo = {
            "user[mobile]": info.mobile,
            "user[encrypted_password]": info.encrypted_password,
        };
        var checkRet = Signin.checkFiled(info);
        if (checkRet != null) { //==null验证通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/users.json').then(function (resp) {
            if (resp.data.data == "succ") {
                alert("注册成功，为您跳转至登录页面！");
                window.location = "#/login";
            }
        });


    }
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

.controller('ResetPasswdCtrl', function ($scope, $http, $stateParams, ResetPassword, httpServicePost, $rootScope) {
    $scope.info = {
        oldencrypted_password: "",
        newencrypted_password: "",
        renewencrypted_password: ""
    };

    $scope.showerror = false;
    $scope.submit = function () {
        var id = $rootScope.userid;
        var info = $scope.info;
        var userinfo = {
            "user[mobile]": info.mobile,
            "user[encrypted_password]": info.encrypted_password,
        };
        var checkRet = ResetPassword.checkFiled(info);
        if (checkRet != null) { //==null验证通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/users.json').then(function (resp) {
            if (resp.data.data == "succ") {
                alert("注册成功，为您跳转至登录页面！");
                window.location = "#/login";
            }
        });


    }
    $scope.jump = function (url) {
        window.location = url;
    };
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