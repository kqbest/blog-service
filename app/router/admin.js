'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', adminauth, controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/insertArticle', adminauth, controller.admin.main.insertArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/deleteArticle', adminauth, controller.admin.main.deleteArticle);
  router.get('/admin/getArticleById', adminauth, controller.admin.main.getArticleById);
};
