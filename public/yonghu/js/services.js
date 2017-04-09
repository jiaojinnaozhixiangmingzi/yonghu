angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: '2017年-3月-20日',
    lastText: '共计120元',
    status: '配送中',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: '2017年-3月-10日',
    lastText: '共计120元',
    status: '已完成',
    face: 'img/max.png'
  }, {
    id: 2,
    name: '2017年-3月-4日',
    lastText: '共计120元',
    status: '已完成',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: '2017年-2月-20日',
    lastText: '共计120元',
    status: '已完成',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: '2017年-1月-31日',
    lastText: '共计120元',
    status: '已完成',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
//
//.factory('Login', function() {
//  // Might use a resource here that returns a JSON array
//
//  // Some fake testing data
//  var chats = [{
//    id: 0,
//    name: '2017年-3月-20日',
//    lastText: '共计120元',
//    status: '配送中',
//    face: 'img/ben.png'
//  }, {
//    id: 1,
//    name: '2017年-3月-10日',
//    lastText: '共计120元',
//    status: '已完成',
//    face: 'img/max.png'
//  }, {
//    id: 2,
//    name: '2017年-3月-4日',
//    lastText: '共计120元',
//    status: '已完成',
//    face: 'img/adam.jpg'
//  }, {
//    id: 3,
//    name: '2017年-2月-20日',
//    lastText: '共计120元',
//    status: '已完成',
//    face: 'img/perry.png'
//  }, {
//    id: 4,
//    name: '2017年-1月-31日',
//    lastText: '共计120元',
//    status: '已完成',
//    face: 'img/mike.png'
//  }];
//
//  return {
//    all: function() {
//      return chats;
//    },
//    remove: function(chat) {
//      chats.splice(chats.indexOf(chat), 1);
//    },
//    get: function(chatId) {
//      for (var i = 0; i < chats.length; i++) {
//        if (chats[i].id === parseInt(chatId)) {
//          return chats[i];
//        }
//      }
//      return null;
//    }
//  };
//})
;
