var Mock = require('mockjs')
var Random = Mock.Random
exports.close = async(ctx, next) => {
  // await new Promise((resolve, reject) => {
  // 	setTimeout(resolve, 3000)
  // })
  //console.log(ctx.request.body)
  // 使用 Mock

  var data = Mock.mock({

    total: "@integer(60, 100)",
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'rows|50-100': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'ticket|1-10000': 1,

        'login|90001-100000': 1,
        "cmd|1": [
          "0", "1"
        ],
        "symbol|1": [
          "EURUSD", "JPYUSD", "AGUSD"
        ],
        'name': '@cname', // 中文名称

        "open_time": "@date('yyyy-MM-dd')",
        "close_time": function() {
          //总是比open_time 晚
          var start = new Date(this.open_time);
          start.setDate(start.getDate() + Random.integer(1, 10));
          return start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
        },
        "open_price": "@float(0, 2, 5, 5)",
        "close_price": "@float(0, 2, 5, 5)"
      }
    ]
  })
  // 输出结果
  //console.log(JSON.stringify(data, null, 4))

  ctx.body = data
}
