# 微信小程序支持async/await

* babel编译
* gulp构建


---

```javascript
function myAsyncFunc() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("myAsyncFunction done!");
            resolve({
                data: "Hello,World"
            });
        }, 5000);
    });
}

async function test() {
    var result = await myAsyncFunc();
    console.log(result.data); //Hello,World
}

async function sleep(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}
```



----

##　首次使用

1. npm install 安装依赖

2. npm run build 

   生成dist，用微信开发工具打开

## 日常开发

1. npm run watch

   监视src的修改，同步到dist中



---

*建议vscode安装插件vscode-wechat*

