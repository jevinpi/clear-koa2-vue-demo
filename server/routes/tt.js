const jwt = require('jsonwebtoken')

let token = jwt.sign({
    data: 'foobar'
}, 'secret', { expiresIn: '1h' });


function verifyJwt(token) {
    let res;
    jwt.verify(token, 'secaret', function (err, decoded) {
        if (err) {
            res =  false
        } else {
            res = decoded
        }
    })
    return res;
}
console.log(verifyJwt(token))