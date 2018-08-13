const router = require('koa-router')()

router.get('/ver', function (ctx, next) {
  console.log(ctx.header.authorization)
  ctx.body = '这个接口需要验证!'
})

router.get('/ver_1', function (ctx, next) {
  ctx.body = '这个接口也需要验证'
})

module.exports = router
