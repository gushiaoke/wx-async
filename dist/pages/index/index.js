'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//index.js
//获取应用实例
var regeneratorRuntime = require('../../lib/runtime');
var util = require('../../utils/util');

var app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        });
    },
    onLoad: function onLoad() {
        var _this = this;

        console.log('onLoad');
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            });
        });

        var f = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!true) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 3;
                                return util.sleep(1000);

                            case 3:
                                console.log('ok');
                                _context.next = 0;
                                break;

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function f() {
                return _ref.apply(this, arguments);
            };
        }();

        f();
    }
});