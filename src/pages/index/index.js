//index.js
//获取应用实例
const regeneratorRuntime = require('../../lib/runtime');
const util = require('../../utils/util');

var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        const f = async () => {
            while (true) {
                await util.sleep(1000);
                console.log('ok');
            }
        }

        f();
    }
})