import Koa from 'koa'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import path from 'path'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import renderHomePageAsync from './render'

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


router.post('/users', (ctx, next) => {
	ctx.body = [{
		name: 'tom',
		age: 23
	}]
})

router.post('/login', async (ctx, next) => {
	await new Promise((resolve, reject) => {
		setTimeout(resolve, 3000)
	})
	ctx.body = {
		errorcode: 0,
		errormsg: '登录成功'
	}
})

router.get('/favicon.ico', (ctx, next) => {
	ctx.body = null
})

//渲染页面
router.get('*', async (ctx, next) => {
	const homePage = await renderHomePageAsync()
	ctx.type = 'html'
	ctx.body = homePage
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080)
console.log('app started at port 8080...')