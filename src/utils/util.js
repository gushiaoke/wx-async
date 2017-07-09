

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function watch() {

}

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

module.exports = {
    formatTime: formatTime,
    sleep
}