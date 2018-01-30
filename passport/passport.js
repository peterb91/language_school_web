var bcrypt = require('bcryptjs');
var salt   = '$2a$10$wENMOiXaNvkXN9BmCbh4ZO';

require('./local-register')(salt);
require('./local-login')(salt);
require('./session');