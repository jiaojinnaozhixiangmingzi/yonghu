angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, httpServicePost) {
    $scope.jump = function (url) {
        window.location = url;
    };
    var serviceRet = httpServicePost.gethttp('/products.json').then(function (resp) {
        if (resp.data.data == "Login succ") {
            alert("登录成功");
            //                $rootScope.userid = resp.data.data[0].id;
            window.location = "#/tab/dash";
        }
        //响应成功时调用，resp是一个响应对象
    });

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
            if (resp.data.data == "Login succ") {
                alert("登录成功");
                $rootScope.userid = resp.data.data[0].id;
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
            "old_encrypted_password": info.oldencrypted_password,
            "new_encrypted_password": info.newencrypted_password,
        };
        var checkRet = ResetPassword.checkFiled(info);
        if (checkRet != null) { //==null验证通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/users/8/reset.json').then(function (resp) {
            if (resp.data.data == "Retset succ") {
                alert("修改密码成功！");
                window.location = "#/tab/account";
            } else {
                alert("修改密码失败，您输入的旧密码有误！");
            }
        });


    }
    $scope.jump = function (url) {
        window.location = url;
    };
})



.controller('ShowProductCtrl', function ($scope, httpServicePost) {
        $scope.jump = function (url) {
            window.location = url;
        };
    var serviceRet = httpServicePost.gethttp('/categories.json').then(function (resp) {
        if (resp.data != null) {
            $scope.data = resp.data;
            //                $rootScope.userid = resp.data.data[0].id;
            window.location = "#/tab/dash";
        }
        //响应成功时调用，resp是一个响应对象
    });
    
    $scope.changeCate = function (obj) {
        var info = "info";
    }
    $scope.isCurrent = function(index){
        $scope.bg = [];
        $scope.bg[index] = 'current';
        
        var serviceRet = httpServicePost.gethttp('/categories/'+index+'.json').then(function (resp) {
        if (resp.data != null) {
            $scope.data = resp.data;
            //                $rootScope.userid = resp.data.data[0].id;
            window.location = "#/tab/dash";
        }
        //响应成功时调用，resp是一个响应对象
    });
    }
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