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
            } else {
                alert("账号密码不匹配！");
                window.location = "#/login";
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
            } else {
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
                } else {
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



.controller('InputYuyueCtrl', function ($scope, httpServicePost, $rootScope) {
        $scope.totalprice = $rootScope.totalPrice;
    })
    .controller('ShowProductCtrl', function ($scope, httpServicePost, $rootScope) {
        $scope.jump = function (url) {
            window.location = url;
        };
        $scope.showtotalPrice = 0;
        $scope.maimaimai = true;
        $scope.changeClass = 'yuyue0';
        //        alert($rootScope.totalPrice);
        //        if ($rootScope.totalPrice > 0) {
        //            $scope.maimaimai = false;
        //            $scope.showtotalPrice = '共计' + $rootScope.totalPrice + '元';
        //
        //        } else {
        //            $scope.maimaimai = true;
        //
        //        }
        var datainfo = {
            "category_id": "1"
        };
        var serviceRet1 = httpServicePost.posthttp(datainfo, '/products/8/getByCategory.json').then(function (response) {
            if (response.data != null) {
                var productdata = response.data.data;
                $scope.products = productdata;
            }
            //响应成功时调用，resp是一个响应对象
        });
        var serviceRet = httpServicePost.posthttp('/categories/getByCity?cityId=2').then(function (resp) {
            if (resp.data != null) {

                $scope.data = resp.data;
                //                $rootScope.userid = resp.data.data[0].id;
                //            window.location = "#/tab/dash";
            }
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

        $scope.goyuyue = function () {
            if ($scope.changeClass != 'yuyue0') {
                window.location = "#/inputYuyueForm";
            }
        };

        $scope.selectProduct = function (obj) { //选择商品
            var productInfo = 'd';
            var categoryId = obj.product.category_id;
            var productId = obj.product.id;
            $rootScope.totalPrice += 1;
            if ($rootScope.totalPrice > 0) {
                $scope.maimaimai = false;
            } else {
                $scope.maimaimai = true;

            }
            $scope.showtotalPrice = $rootScope.totalPrice;
            $scope.changeClass = 'yuyue1';



            //            $scope.maimaimai = false;
            //连后台购物车数据库

            //            $scope.bg = [];
            //            $scope.bg[index] = 'current';
            //            index += 1;
            //            var data = {
            //                "category_id": index
            //            };
            //            var serviceRet = httpServicePost.posthttp(data, '/products/8/getByCategory.json').then(function (resp) {
            //                if (resp.data != null) {
            //                    $scope.products = resp.data.data;
            //                    //                $rootScope.userid = resp.data.data[0].id;
            //                }
            //                //响应成功时调用，resp是一个响应对象
            //            });
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
    .controller('LocationMgtCtrl', function ($scope) {
        var sss = $scope.myVar;
        $scope.myVar = true;
        $scope.jump = function (url) {
            window.location = url;
        };
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
    $scope.doRefresh = function () {
        $scope.chatss = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('GetLocationCtrl', function ($scope, $stateParams, Chats) {
    $scope.realLocation = '定位中，请稍后……';
    $scope.realLocation1 = '';

    $scope.chat = Chats.get($stateParams.chatId);
    var jingweidu = new Array();
    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: false
    });
    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            convert: true,
            buttonPosition: 'RB',
            maximumAge: 1
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        //        geolocation.watchPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息


    });
    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            convert: true,
            buttonPosition: 'RB',
            maximumAge: 1
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        //        geolocation.watchPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息


    });

    function onComplete(data) {
        var str = ['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        str.push('精度：' + data.accuracy + ' 米');
        //        str.push('精度：' + data.timeStamp.getTime() + ' 米');
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        str.push('是否经过偏移：' + (data.info));
        console.log(data.accuracy);

        if (data.accuracy < 500 && jingweidu.length == 0 && jingweidu.length < 2) {
            jingweidu.push(data.position.getLng());
            jingweidu.push(data.position.getLat());
            var dom = document.getElementById("locationno");
                dom.innerHTML= jingweidu;

            regeocoder(jingweidu);
        }

    }
    //解析定位错误信息
    function onError(data) {
        console.log('定位失败');
    }

    function regeocoder(lnglatXY) { //逆地理编码
        //        var lnglatXY = [116.342439, 39.953557]; //已知点坐标

        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                geocoder_CallBack(result);
            }
        });
    }

    function geocoder_CallBack(data) {
        var address = data.regeocode.formattedAddress; //返回地址描述
        $scope.realLocation1 = address;
        var dom = document.getElementById("locationText");
                dom.innerHTML= address;
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {

    $scope.settings = {
        enableFriends: true
    };
    $scope.jump = function (url) {
        window.location = url;
    };
});