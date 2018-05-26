import React, { Component } from 'react';
import { render } from 'react-dom';
import Link from 'next/link'
import fetch from 'isomorphic-fetch';

import Layout from '~/components/layout'
import Head from 'next/head'

let commentsNum = 10;

export default class Article extends Component {

  static async getInitialProps({ req, query:{id}}) {

    let params = `query{
      article(id:${id}){
        id,
        title,
        html,
        addTime,
        author{
          nickname
        },
        tags{
          id,
          name
        },
        comments{
          id,
          user{
            nickname
          },
          content,
          addTime,
          replys{
            id,
            user{
              nickname
            },
            content,
            addtime
          }
        }
      }
    }`.replace(/\s+/g, '')

    // console.log(params);

    let resp = await fetch("http://blogapi/", {
      method: 'POST',
      headers: new Headers({
        "Content-Type": 'application/graphql'
      }),
      body: params
    });

    // console.log("error:", await resp.text())

    let data = await resp.json()

    return data.data
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>{this.props.article.title}</title>
        </Head>

    <div class="widewrapper main">
        <div class="container">
            <div class="row">
                <div class="col-md-8 blog-main">
                    <article class="blog-post">

                        <div class="body">
                            <h1>{this.props.article.title}</h1>
                            <div class="meta">
                                <i class="fa fa-user"></i> {this.props.article.author.nickname}
                                <i class="fa fa-calendar"></i> {this.props.article.addtime}
                                <i class="fa fa-comments"></i>
                                <span class="data"><a href="#comments"> {this.props.article.commentsNum} Comments</a></span>
                            </div>

                            <div class="markdown-body" dangerouslySetInnerHTML={{__html:this.props.article.html}} />
                        </div>
                    </article>

                    <aside class="comments" id="comments">
                        <hr />

                        <h2><i class="fa fa-comments"></i> {commentsNum} Comments</h2>

                        {this.props.article.comments.map(comment=>(
                          <div>
                        <article class="comment" id={"comment-"+comment.id}>
                            <header class="clearfix">
                                <div class="meta">
                                    <h3><a href="#">{comment.user.nickname}</a></h3>
                                    <span class="date">
                                        {comment.addtime}
                                    </span>
                                    <span class="separator">
                                        -
                                    </span>

                                    <a onclick="reply({{ comment.id|json_encode }}, {{ comment.user.nickname|json_encode}} )" href="#create-comment" class="reply-link">Reply</a>
                                </div>
                            </header>
                             <div class="body">
                             {comment.content}
                            </div>
                        </article>


                        {(comment.replys.length > 0) && (
                        <aside class="comments" id={"replys-"+comment.id}>
                            {comment.replys.map((reply,i)=> (i<=10) ? (
                            <article class="comment reply" id={"reply-"+reply.id}>
                                <header class="clearfix">
                                    <div class="meta">
                                        <h3><a href="#">{reply.user.nickname}</a></h3>
                                        <span class="date">
                                            {reply.addtime}
                                        </span>
                                        <span class="separator">
                                            -
                                        </span>

                                        <a onclick="reply({{ reply.id|json_encode }}, {{ reply.user.nickname|json_encode }})" href="#create-comment" class="reply-link">Reply</a>
                                    </div>
                                </header>
                                <div class="body">
                                {reply.content}
                                </div>
                            </article>
                              ) : (
                                <div class="replysMore">
                                    <a href="javascript:void()" onclick="replyPage({{comment.id}}, 2)">下一页</a>
                                </div>
                              ))}

                        </aside>
                        )}

                          </div>
                        ))}
                    </aside>


                    <aside class="create-comment" id="create-comment">
                        <hr />

                        <h2><i class="fa fa-pencil"></i> Add Comment</h2>

                        <form id="hid_form" onsubmit="return dosubmit()" action="/comment" method="post">
                            <input type="hidden" name="id" value={this.props.article.id} />
                            <input id="hid_reply" type="hidden" name="reply" value="0" />

                            <textarea id="hid_content" onchange="comment()" rows="10" name="content" id="comment-body" placeholder="Your Message" class="form-control input-lg"></textarea>

                            <div class="buttons clearfix">
                                <button type="submit" class="btn btn-xlarge btn-clean-one">Submit</button>
                            </div>
                        </form>
                    </aside>
                </div>
                <aside class="col-md-4 blog-aside">

                    <div class="aside-widget">
                        <header>
                            <h3>Featured Post</h3>
                        </header>
                        <div class="body">
                            <ul class="clean-list">
                                <li><a href="">Clean - Responsive HTML5 Template</a></li>
                                <li><a href="">Responsive Pricing Table</a></li>
                                <li><a href="">Yellow HTML5 Template</a></li>
                                <li><a href="">Blackor Responsive Theme</a></li>
                                <li><a href="">Portfolio Bootstrap Template</a></li>
                                <li><a href="">Clean Slider Template</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="aside-widget">
                        <header>
                            <h3>Related Post</h3>
                        </header>
                        <div class="body">
                            <ul class="clean-list">
                                <li><a href="">Blackor Responsive Theme</a></li>
                                <li><a href="">Portfolio Bootstrap Template</a></li>
                                <li><a href="">Clean Slider Template</a></li>
                                <li><a href="">Clean - Responsive HTML5 Template</a></li>
                                <li><a href="">Responsive Pricing Table</a></li>
                                <li><a href="">Yellow HTML5 Template</a></li>
                            </ul>
                        </div>
                    </div>

                    {this.props.article.tags.length > 0 && (
                    <div class="aside-widget">
                        <header>
                            <h3>Tags</h3>
                        </header>
                        <div class="body clearfix">
                            <ul class="tags">
                                {this.props.article.tags.map(tag=>(
                                    <li key={tag.id}><a href={"/tag"+tag.id}>{tag.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    )}
                </aside>
            </div>
        </div>
    </div>

<div id="ResultModal" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">操作结果</h4>
      </div>
      <div class="modal-body"> 处理中... </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
      </div>
    </div>
  </div>
</div>

      </Layout>
    )
  }
}
