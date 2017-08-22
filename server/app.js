import Koa from 'koa'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import path from 'path'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

var Mock = require('mockjs')
const router = new Router()

const app = new Koa()
const compile = webpack(webpackConfig)

app.use(bodyParser())

app.use(devMiddleware(compile, {
	noInfo: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: false
	},
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true
	}
}))

//webpack热更新
app.use(hotMiddleware(compile, {
	// log: console.log,
	// path: '/__webpack_hmr',
	// heartbeat: 10 * 1000
}))


//mock 接口部分
const prefix='/api/v1'
router.get(prefix+'/test', async (ctx, next) => {
	// await new Promise((resolve, reject) => {
	// 	setTimeout(resolve, 3000)
	// })
	//console.log(ctx.request.body)
	// 使用 Mock

	var data = Mock.mock({
	    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	    'list|10-100': [{
	        // 属性 id 是一个自增数，起始值为 1，每次增 1
	        'id|+1': 1
	    }]
	})
	// 输出结果
	//console.log(JSON.stringify(data, null, 4))


	ctx.body =  data
})

//模拟登录接口
router.post('/login', async (ctx, next) => {
	await new Promise((resolve, reject) => {
		setTimeout(resolve, 3000)
	})
	console.log(ctx.request.body)
	ctx.body = {
		errorcode: 0,
		errormsg: '登录成功'
	}
});

router.get('/favicon.ico', (ctx, next) => {
	ctx.body = null
})

//渲染页面
router.get('*', async (ctx, next) => {
	ctx.type = 'html'
	ctx.body = `<!DOCTYPE html>
				<html lang="en">
				<head>
				<meta charset="UTF-8">
				<title>mobx-demo</title>
				<style>
					*{
					margin: 0;
					padding: 0;
					}
					html,
					body {
					-webkit-tap-highlight-color: transparent;
					height: 100%;
					touch-action: none;
					}
				</style>
				</head>
				<body>
				<div id="root" style="height: 100%;"></div>
				<script src="/dist/bundle.js"></script>
				</body>
				</html>`
})


app.use(router.routes()).use(router.allowedMethods());


app.listen(8080)
console.log('app started at port 8080...')
