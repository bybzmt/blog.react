import React, { Component } from 'react';
import { render } from 'react-dom';
import Link from 'next/link'
import fetch from 'isomorphic-fetch';

import Layout from '~/components/layout'
import Head from 'next/head'
import AsideFeaturedPost from '~/components/aside/featured_post'
import AsideRelatedPost from '~/components/aside/related_post'
import AsideTags from '~/components/aside/tags'
import Pagination from '~/components/pagination'

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
        },
        commentsNum
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

  constructor(props) {
    super(props);

    this.state = {
      resultModal: false,
      resultModalStatus: 0,
      resultModalMessage: "",

      content:"",
      reply:0,
    };

    this.dosubmit = this.dosubmit.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.commentGoPage = this.commentGoPage.bind(this);
  }

  commentGoPage(page) {
    console.log(page)
  }

  contentChange(event) {
    let content = event.target.value;

    let reply = this.state.reply
    if (content.lenght < 1 || content[0] != "@") {
      reply = 0
    }

    this.setState({
      content: content,
      reply: reply,
    })
  }

  reply(reply_id, nickname) {
    this.setState({
      reply:0,
      content: '@'+nickname+" ",
    });
  }

  dosubmit() {
    this.setState({
      resultModal: true,
      resultModalStatus: 0,
    })

    let data = new FormData();
    data.append("id", this.props.article.id);
    data.append("reply", this.props.reply);

    fetch("/comment", {
      method: 'POST',
      body: data
    })
      .then(resp=>resp.json())
      .then(json=>{
        this.setState({
          resultModalStatus: (json.ret > 0) ? 2 : 1,
          resultModalMessage: json.data,
        })
      })

    return false;
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>{this.props.article.title}</title>
        </Head>

    <div className="widewrapper main">
        <div className="container">
            <div className="row">
                <div className="col-md-8 blog-main">
                    <article className="blog-post">

                        <div className="body">
                            <h1>{this.props.article.title}</h1>
                            <div className="meta">
                                <i className="fa fa-user"></i> {this.props.article.author.nickname}
                                <i className="fa fa-calendar"></i> {this.props.article.addtime}
                                <i className="fa fa-comments"></i>
                                <span className="data"><a href="#comments"> {this.props.article.commentsNum} Comments</a></span>
                            </div>

                            <div className="markdown-body" dangerouslySetInnerHTML={{__html:this.props.article.html}} />
                        </div>
                    </article>

                    <aside className="comments" id="comments">
                        <hr />

                        <h2><i className="fa fa-comments"></i> {commentsNum} Comments</h2>

                        {this.props.article.comments.map(comment=>(
                          <div key={comment.id}>
                        <article className="comment" id={"comment-"+comment.id}>
                            <header className="clearfix">
                                <div className="meta">
                                    <h3><a href="#">{comment.user.nickname}</a></h3>
                                    <span className="date">
                                        {comment.addtime}
                                    </span>
                                    <span className="separator">
                                        -
                                    </span>

                                    <a onClick={((comment)=>()=>this.reply(comment.id, comment.user.nickname)).bind(this)(comment)} href="#create-comment" className="reply-link">Reply</a>
                                </div>
                            </header>
                             <div className="body">
                             {comment.content}
                            </div>
                        </article>


                        {(comment.replys.length > 0) && (
                        <aside className="comments" id={"replys-"+comment.id}>
                            {comment.replys.map((reply,i)=> (i<=10) ? (
                            <article key={i} className="comment reply" id={"reply-"+reply.id}>
                                <header className="clearfix">
                                    <div className="meta">
                                        <h3><a href="#">{reply.user.nickname}</a></h3>
                                        <span className="date">
                                            {reply.addtime}
                                        </span>
                                        <span className="separator">
                                            -
                                        </span>

                                        <a onClick={((reply)=>()=>this.reply(reply.id, reply.user.nickname)).bind(this)(reply)} href="#create-comment" className="reply-link">Reply</a>
                                    </div>
                                </header>
                                <div className="body">
                                {reply.content}
                                </div>
                            </article>
                              ) : (
                                <div className="replysMore">
                                    <a href="javascript:void()" onClick="replyPage({{comment.id}}, 2)">下一页</a>
                                </div>
                              ))}

                        </aside>
                        )}

                          </div>
                        ))}
                    </aside>

                    <Pagination
                      count={this.props.article.commentsNum}
                      size={10}
                      current={1}
                      fn={this.commentGoPage}
                    />

                    <aside className="create-comment" id="create-comment">
                        <hr />

                        <h2><i className="fa fa-pencil"></i> Add Comment</h2>

                        <form id="hid_form" onSubmit={this.dosubmit}>
                          <textarea id="hid_content" onChange={this.contentChange} rows="10" name="content" id="comment-body" placeholder="Your Message" className="form-control input-lg" value={this.state.content}></textarea>

                            <div className="buttons clearfix">
                                <button type="submit" className="btn btn-xlarge btn-clean-one">Submit</button>
                            </div>
                        </form>
                    </aside>
                </div>
                <aside className="col-md-4 blog-aside">
                    <AsideFeaturedPost />

                    <AsideRelatedPost />

                    <AsideTags tags={this.props.article.tags} />
                </aside>
            </div>
        </div>
    </div>

  {this.state.resultModal && (
<div id="ResultModal" className="modal fade" tabIndex="-1" role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">操作结果</h4>
      </div>
      <div className="modal-body">
        {(this.state.resultModalStatus==0) ? "处理中..." : (
        this.state.resultModalStatus==1
        ) ?
        <p class='alert alert-success'> {this.state.resultModalMessage} </p>
        :
        <p class='alert alert-warning'>{this.state.resultModalMessage}</p>
        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal">确定</button>
      </div>
    </div>
  </div>
</div>
  )}

      </Layout>
    )
  }
}
