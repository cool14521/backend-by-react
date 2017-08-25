var Mock = require('mockjs')

exports.test = async(ctx, next) => {
  // await new Promise((resolve, reject) => {
  // 	setTimeout(resolve, 3000)
  // })
  //console.log(ctx.request.body)
  // 使用 Mock

  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10-100': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
      }
    ]
  })
  // 输出结果
  //console.log(JSON.stringify(data, null, 4))

  ctx.body = data
}
