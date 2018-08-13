const router = require('./instance');

const users = require('./users');
const login = require('./login');
const test = require('./test');
const api = require('./api');

router.use('', test.routes(), test.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());

module.exports = router;