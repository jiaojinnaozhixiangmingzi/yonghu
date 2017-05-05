angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, httpServicePost) {
    $scope.jump = function (url) {
        window.location = url;
    };
    var serviceRet = httpServicePost.gethttp('/products.json').then(function (resp) {
        if (resp.data.data == "Login succ") {
            alert("登录成功");
            //        $rootScope.userid = resp.data.data[0].id;
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
                $rootScope.userid = resp.data.msg.id;
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



.controller('InputYuyueCtrl', function ($scope, httpServicePost, $rootScope, CartData, $ionicHistory, SelectAddr) {
    $scope.totalprice = CartData.cartData.total.total_price;
    $scope.location = {
        name: "",
        id:""
    };
    $scope.location.name = SelectAddr.selectAddr.name;
    $scope.location.id = SelectAddr.selectAddr.id;

    $scope.submitForm = function () {
        CartData.cartData.total.address_id = $scope.location.id;
        var serviceRet = httpServicePost.posthttp(CartData.cartData.total, 'http://localhost:3001/orders/createOrder.json').then(function (resp) {
            if (resp.data != null) {
                var order_id = resp.data.data.id;
                //                var tmpinfo = ItemsData.itemsData;
                $scope.totalprice = CartData.cartData.total_price;
                var successAmout = 0;
                for (var i = 0; i < CartData.cartData.products.length; i++) {
                    CartData.cartData.products[i]["order_id"] = order_id;
                    var serviceRet = httpServicePost.posthttp(CartData.cartData.products[i], 'http://localhost:3001/items/createItem.json').then(function (resp) {
                        if (resp.data != null) {
                            successAmout += 1;
                            if (successAmout == CartData.cartData.products.length) {
                                alert("下单成功！");
                                $ionicHistory.clearCache(["showProduct"]);
                                CartData.cartData = [];
                                $rootScope.totalPrice = 0;
                                window.location = "#/tab/chatse";
                            }
                        }
                    });
                }
            }
        });
    }
})

.controller('ShowProductCtrl', function ($scope, httpServicePost, $rootScope, CartData) {
        $scope.jump = function (url) {
            window.location = url;
        };
        $scope.showtotalPrice = 0;
        $scope.maimaimai = true;
        $scope.changeClass = 'yuyue0';
        var data = {
            "categoryId": 1
        };
        var jsonpData = {
            "categoryId": 1,
            "cityId": "1"
        }
        var priceLevel;
        var serviceRet = httpServicePost.posthttp(jsonpData, 'http://localhost:3001/price_rules/getPriceRules.json').then(function (resp) {
            if (resp.data != null) {
                priceLevel = resp.data.data[0].grade;

                var serviceRet = httpServicePost.posthttp(data, '/products/getByCityAndCategory.json').then(function (resp) {
                    if (resp.data != null) {
                        var products = resp.data.data;
                        for (var i = 0; i < products.length; i++) {
                            var priceruleVar = '';
                            switch (priceLevel) {
                            case 1:
                                products[i].price1 = products[i].price1;
                                break;
                            case 2:
                                products[i].price1 = products[i].price2;
                                break;
                            case 3:
                                products[i].price1 = products[i].price3;
                                break;
                            case 4:
                                products[i].price1 = products[i].price4;
                                break;
                            case 5:
                                products[i].price1 = products[i].price5;
                                break;
                            case 6:
                                products[i].price1 = products[i].price6;
                                break;
                            };
                        }
                        $scope.products = products;
                        //                $rootScope.userid = resp.data.data[0].id;
                    }
                    //响应成功时调用，resp是一个响应对象
                });
                //                    $scope.products = resp.data.data;
                //                $rootScope.userid = resp.data.data[0].id;
            }
            //响应成功时调用，resp是一个响应对象
        });
        var cityinfo = {
            "cityId": "2"
        };
        var serviceRet = httpServicePost.posthttp(cityinfo, '/categories/getByCity.json').then(function (resp) {
            if (resp.data != null) {

                $scope.data = resp.data.data;

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
                "categoryId": index
            };
            var jsonpData = {
                "categoryId": index,
                "cityId": "1"
            }
            var priceLevel;
            var serviceRet = httpServicePost.posthttp(jsonpData, 'http://localhost:3001/price_rules/getPriceRules.json').then(function (resp) {
                if (resp.data != null) {
                    priceLevel = resp.data.data[0].grade;

                    var serviceRet = httpServicePost.posthttp(data, '/products/getByCityAndCategory.json').then(function (resp) {
                        if (resp.data != null) {
                            var products = resp.data.data;
                            for (var i = 0; i < products.length; i++) {
                                var priceruleVar = '';
                                switch (priceLevel) {
                                case 1:
                                    products[i].price1 = products[i].price1;
                                    break;
                                case 2:
                                    products[i].price1 = products[i].price2;
                                    break;
                                case 3:
                                    products[i].price1 = products[i].price3;
                                    break;
                                case 4:
                                    products[i].price1 = products[i].price4;
                                    break;
                                case 5:
                                    products[i].price1 = products[i].price5;
                                    break;
                                case 6:
                                    products[i].price1 = products[i].price6;
                                    break;
                                };
                            }
                            $scope.products = products;
                            //                $rootScope.userid = resp.data.data[0].id;
                        }
                        //响应成功时调用，resp是一个响应对象
                    });
                    //                    $scope.products = resp.data.data;
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
        var productInfos = [];
        $scope.selectProduct = function (obj) { //选择商品
            var productInfo = 'd';
            var categoryId = obj.product.category_id;
            var productId = obj.product.id;
            $rootScope.totalPrice += obj.product.price1;
            if ($rootScope.totalPrice > 0) {
                $scope.maimaimai = false;
            } else {
                $scope.maimaimai = true;

            }
            var isfound = false;
            if (productInfos.length > 0) {
                for (var j = 0; j < productInfos.length; j++) {
                    if (productId == productInfos[j].product_id) {
                        productInfos[j].amount += 1;
                        isfound = true;
                        break;
                    }
                }
                if (isfound == false) {
                    productInfos.push({
                        "product_id": productId,
                        "price": obj.product.price1,
                        "amount": 1
                    });
                }
            } else {
                productInfos.push({
                    "product_id": productId,
                    "price": obj.product.price1,
                    "amount": 1
                });
            }


            var tmpinfo = CartData.cartData;
            CartData.cartData.total = {
                "user_id": $rootScope.userid,
                "category_id": categoryId,
                "address_id": 1,
                "total_price": $rootScope.totalPrice,
                "status": 0,
                "courier_status": 0,
                "voucher_status": 0,
                "cleanning_status": 0
            };
            CartData.cartData.products = productInfos;
            //            ItemsData.itemsData.push(productInfos);
            $scope.showtotalPrice = CartData.cartData.total.total_price;
            $scope.changeClass = 'yuyue1';
        }
    })
    .controller('ZhuCtrl', function ($scope) {
        var sss = $scope.myVar;
        $scope.myVar = true;
        //  $scope.settings = {
        //    enableFriends: true
        //  };
    })
.controller('LocationMgtCtrl', function ($scope, $rootScope, httpServicePost, $ionicHistory, SelectAddr) {
        var sss = $scope.myVar;
        $scope.myVar = true;
        $scope.jump = function (url) {
            window.location = url;
        };
        $scope.locations = [];
        var info = {
            "userId": $rootScope.userid
        };
        var serviceRet = httpServicePost.posthttp(info, 'http://localhost:3001/addresses/getAddressByUser.json').then(function (resp) {
            var tmpinfo = resp;
//            Chats.chats = resp.data.data;
            $scope.locations = resp.data.data;
        });
        $scope.selectAdd = function(id,name){
//            window.location = "#/inputYuyueForm";
            SelectAddr.selectAddr = {"id":id,"name":name};
            $ionicHistory.goBack();
        }
    })

.controller('ChatsCtrl', function ($scope, Chats, httpServicePost, $rootScope) {
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
        var info = {
            "userId": $rootScope.userid
        };
        var serviceRet = httpServicePost.posthttp(info, 'http://localhost:3001/orders/getOrderByUser.json').then(function (resp) {
            var tmpinfo = resp;
            Chats.chats = resp.data.data;
            $scope.chatss = Chats.chats;
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.chatss = [];
    var info = {
        "userId": $rootScope.userid
    };
    var serviceRet = httpServicePost.posthttp(info, 'http://localhost:3001/orders/getOrderByUser.json').then(function (resp) {
        var tmpinfo = resp;
        Chats.chats = resp.data.data;
        $scope.chatss = Chats.chats;
    });
})

.controller('GetLocationCtrl', function ($scope, $stateParams, Chats, $rootScope, httpServicePost) {
    $scope.realLocation = '定位中，请稍后……';
    $scope.realLocation1 = '';

    $scope.chat = Chats.get($stateParams.chatId);
    $scope.goyuyue = function () {
        var jingweidu = document.getElementById("locationno").innerHTML;
        var strs=jingweidu.split(",");
        var info = {
            "address": $scope.realLocation1,
            "lat": strs[0],
            "lng": strs[1],
            "addressable_type": 'User',
            "addressable_id": $rootScope.userid,
        };
        var serviceRet = httpServicePost.posthttp(info, 'http://localhost:3001/addresses/createAddress.json').then(function (resp) {
            var tmpinfo = resp;
            if (resp.data != null) {
                alert('添加地址成功！');
                window.location = '#/locationMgt';
            }
            
        });
    }
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
            dom.innerHTML = jingweidu;

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
        dom.innerHTML = address;
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