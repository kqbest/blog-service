'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  // 首页test
  async index() {
    this.ctx.body = 'hi admin';
  }
  // 登录
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = `SELECT user_name FROM user WHERE user_name='${userName}' AND password='${password}'`;
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      // 登录成功，进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = {
        code: 200,
        data: { openId },
        message: '登录成功',
      };
    } else {
      this.ctx.body = {
        code: 501,
        data: null,
        message: '登录失败',
      };
    }
  }
  // 文章类型列表
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    result.sort((a, b) => a.Id - b.Id);
    this.ctx.body = {
      code: 200,
      data: result,
      message: null,
    };
  }
  // 新增文章
  async insertArticle() {
    const dataObj = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', dataObj);
    if (result.affectedRows === 1) {
      this.ctx.body = {
        code: 200,
        data: {
          insertId: result.insertId,
        },
        message: '添加成功！',
      };
    } else {
      this.ctx.body = {
        code: 501,
        data: null,
        message: '添加失败！',
      };
    }
  }
  // 修改文章
  async updateArticle() {
    const dataObj = this.ctx.request.body;
    const result = await this.app.mysql.update('article', dataObj);
    if (result.affectedRows === 1) {
      this.ctx.body = {
        code: 200,
        data: null,
        message: '更新成功！',
      };
    } else {
      this.ctx.body = {
        code: 501,
        data: null,
        message: '更新失败！',
      };
    }
  }
  // 获得文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.view_count as view_count,' +
                'DATE_FORMAT(article.create_time,"%Y-%m-%d") as createTime,' +
                'type.type_name as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'ORDER BY article.id ASC ';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      code: 200,
      data: result,
      message: null,
    };
  }
  // 删除文章
  async deleteArticle() {
    const id = this.ctx.query.id;
    const result = await this.app.mysql.delete('article', { id });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        code: 200,
        data: null,
        message: '删除成功！',
      };
    } else {
      this.ctx.body = {
        code: 501,
        data: null,
        message: '删除失败！',
      };
    }
  }

  // 根据Id获得文章列表
  async getArticleById() {
    const id = this.ctx.query.id;
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.article_content as article_content,' +
              'DATE_FORMAT(article.create_time,"%Y-%m-%d") as createTime,' +
              'article.view_count as view_count ,' +
              'type.type_name as typeName ,' +
              'type.id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
              'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      code: 200,
      data: result,
      message: null,
    };
  }
}

module.exports = MainController;
