const Koa = require('koa')
const app = new Koa()
const cors = require('@koa/cors');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

const router = require('./routes/')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(cors())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    map: {
        html: 'pug'
    }
}))

// jwt
// app.use(function(ctx, next){
//   const token = ctx.header.authorization;
//   console.log('token')
//   console.log(token)
//   console.log('token')
//   if (token) {
//     next()
//   } else {
//     ctx.body = '认证失败'
//   }
// });
app.use((ctx, next) => {
    return next().catch((err) => {
        console.log(111111111111, err.status)
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                ok: false,
                msg: 'token 验证失败'
            }
            console.log(ctx.body)
        } else {
            throw err;
        }
    });
});
app.use(jwt({ secret: 'secret demo' }).unless({ path: [/^\/login\//] }));

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// database

// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });




module.exports = app
