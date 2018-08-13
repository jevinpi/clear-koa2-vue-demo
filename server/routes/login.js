const router = require('koa-router')()
const poolConn = require('./../config/db_config')
const md5 = require('md5')
const jwt = require('koa-jwt')
const jwt_web = require('jsonwebtoken')

function verifyJwt(token) {
    let res;
    jwt_web.verify(token, 'secret demo', function (err, decoded) {
        if (err) {
            res =  false
        } else {
            res = decoded
        }
    })
    return res;
}

router.post('/loginIn', async (ctx, next) => {
    let query = ctx.query;
    // console.log(query)
    let data = await poolConn('select * from sys_user_info where username=? and password=?', [query.username, md5(query.password)])
    if (data.length == 1) {
        ctx.body = {
            code: 100,
            msg: '登陆成功',
            username: data[0].username,
            nickname: data[0].nickname,
            id: data[0].id,
            token: jwt_web.sign({jevin: 'jevinpi'}, 'secret demo', {expiresIn: '1h'})
        }
    } else {
        ctx.body = {
            code: 200,
            msg: '服务器错误'
        }
    }
})

// 修改密码
router.post('/change', async (ctx, next) => {
    let { id, oldPwd, newPwd} = ctx.query;
    if (!id || !oldPwd || !newPwd){
        ctx.body = {
            code: 101,
            msg: '参数不正确'
        }
    } else if (oldPwd == newPwd) {
        ctx.body = {
            code: 100,
            msg: '新密码与旧密码相同'
        }
    } else {
        let data = await poolConn('update sys_user_info set password=? where id=? and exists (select * from (select * from sys_user_info where id=? and password=?) t)',[md5(newPwd), id,id, md5(oldPwd)])
        if (data.affectedRows) {
            ctx.body = {
                code: 100,
                msg: '修改成功'
            }
        } else {
            ctx.body = {
                code: 102,
                msg: '密码错误'
            }
        }
    }
})

// 查看用户
router.post('/alluser', async (ctx, next) => {
    let data = await poolConn('select username from sys_user_info');
    // console.log(verifyJwt(ctx.header.authorization))
    ctx.body = {
        data
    }
})
module.exports = router;