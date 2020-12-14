'use strict';

module.exports = () => {
  return async function adminauth(ctx, next) {
    console.log(ctx.session.openId);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { code: 401, data: '未登录' };
    }
  };
};
