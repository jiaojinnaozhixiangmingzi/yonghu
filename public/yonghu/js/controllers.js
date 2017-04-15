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
        reencrypted_password: "",
        password_token: "",
    };

    $scope.showerror = false;

    $scope.sendMa = function () {

        var info = $scope.info;
        var userinfo = {
            "mobile": info.mobile,
        };
        var checkRet = Signin.checkFiled(info);
        if (userinfo.mobile == null) { //==null验证不通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = "您还未输入邮箱账号！";
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/users/8/registerEmail.json').then(function (resp) {
            if (resp.data.data == "Send succ") {
                alert("验证码发送成功，请在有效期内激活，否则验证码失效！");
                //                window.location = "#/login";
            } else {
                alert("您输入的邮箱账号已被使用，请使用其他账号注册！");
            }
        });
    }
    $scope.submit = function () {
        var info = $scope.info;
        var userinfo = {
            "mobile": info.mobile,
            "encrypted_password": info.encrypted_password,
            "password_token": info.password_token
        };
        var checkRet = Signin.checkFiled(info);
        if (checkRet != null) { //==null验证通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/users/8/setPassword.json').then(function (resp) {
            if (resp.data.data == "Set succ ") {
                alert("注册成功，为您跳转至登录页面！");
                window.location = "#/login";
            }else{
                alert("注册失败，检查您的token是否在有效期内！");
            }
        });


    }
    $scope.jump = function (url) {
        window.location = url;
    };
})

.controller('FindPasswdCtrl', function ($scope, FindpwdCtrl, httpServicePost) {
    $scope.info = {
        mobile: "",
        encrypted_password: "",
        reencrypted_password: "",
        password_token: "",
    };
    $scope.jump = function (url) {
        window.location = url;
    };
    $scope.showerror = false;
    $scope.showInput = false;
    $scope.sendMa = function () {

        var info = $scope.info;
        var userinfo = {
            "mobile": info.mobile,
        };
        var checkRet = FindpwdCtrl.checkFiled(info);
        if (userinfo.mobile == null) { //==null验证不通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = "您还未输入邮箱账号！";
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/users/8/resetEmail.json').then(function (resp) {
            if (resp.data.data == "Send succ") {
                alert("验证码发送成功，请在有效期内激活，否则验证码失效！");
                //                window.location = "#/login";
                $scope.showInput = true;
            } else {
                alert("您输入的邮箱账号已被使用，请使用其他账号注册！");
            }
        });
    }
    $scope.submit = function () {
        var info = $scope.info;
        var userinfo = {
            "mobile": info.mobile,
            "encrypted_password": info.encrypted_password,
            "password_token": info.password_token
        };
        var checkRet = FindpwdCtrl.checkFiled(info);
        if (checkRet != null) { //==null验证通过
            var tipsDom = document.getElementById("showerror");
            tipsDom.innerHTML = checkRet;
            $scope.showerror = true;
            return;
        }
        var serviceRet = httpServicePost.posthttp(userinfo, '/users/8/setPassword.json').then(function (resp) {
            if (resp.data.data == "Set succ ") {
                alert("修改密码成功，为您跳转至登录页面！");
                window.location = "#/login";
            }else{
                alert("注册失败，检查您的token是否在有效期内！");
            }
        });


    }
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
        var datainfo = {
            "category_id": "1"
        };
        var serviceRet1 = httpServicePost.posthttp(datainfo, '/products/8/getByCategory.json').then(function (response) {
            if (response.data != null) {


                var productdata = response.data.data;
                console.log(productdata);
                var mock = [{
                    name: "衬衫",
                    price: "19"
                        }, {
                    name: "棉衣",
                    price: "20"
                        }, {
                    name: "羽绒服",
                    price: "80"
                        }];
                console.log(mock);
                $scope.products = productdata;
            }
            //响应成功时调用，resp是一个响应对象
        });
        var serviceRet = httpServicePost.gethttp('/categories.json').then(function (resp) {
            if (resp.data != null) {

                $scope.data = resp.data;
                //                $rootScope.userid = resp.data.data[0].id;
                //            window.location = "#/tab/dash";
            }
            //响应成功时调用，resp是一个响应对象
        });
        $scope.changeCate = function (obj) {
            var info = "info";
        }


        $scope.isCurrent = function (index) {
            $scope.bg = [];
            $scope.bg[index] = 'current';
            index += 1;
            var data = {
                "category_id": index
            };
            var serviceRet = httpServicePost.posthttp(data, '/products/8/getByCategory.json').then(function (resp) {
                if (resp.data != null) {
                    $scope.products = resp.data.data;
                    //                $rootScope.userid = resp.data.data[0].id;
                }
                //响应成功时调用，resp是一个响应对象
            });
        }
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