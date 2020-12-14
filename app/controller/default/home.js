'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 首页test
  async index() {
    this.ctx.body = 'hi default';
  }
  // 获取文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'DATE_FORMAT(article.create_time,"%Y-%m-%d") as createTime,' +
                'article.view_count as viewCount,' +
                'article.article_content as articleContent,' +
                'type.type_name as typeName,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'ORDER BY id ASC';
    const result = await this.app.mysql.query(sql);

    console.log(1111, result);

    this.ctx.body = {
      code: 200,
      data: result,
      message: null,
    };
  }
  // 根据ID获取文章内容
  async getArticleById() {
    const id = this.ctx.query.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'DATE_FORMAT(article.create_time,"%Y-%m-%d") as createTime,' +
                'article.view_count as viewCount,' +
                'article.article_content as articleContent,' +
                'type.type_name as typeName,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id=type.id ' +
                'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      code: 200,
      data: result,
      message: null,
    };
  }
  // 获取文章类型
  async getTypeInfo() {
    const sql = 'SELECT type.id as id,' +
                'type.type_name as typeName,' +
                'type.order_num as orderName,' +
                'type.icon as icon ' +
                'FROM type ORDER BY id ASC';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      code: 200,
      data: result,
      message: null,
    };
  }
  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.query.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'DATE_FORMAT(article.create_time,"%Y-%m-%d") as createTime,' +
                'article.view_count as view_count,' +
                'type.type_name as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id=type.id ' +
                'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      code: 200,
      data: result,
      message: null,
    };
  }
}

module.exports = HomeController;
