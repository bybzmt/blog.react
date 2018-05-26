import React, { Component } from 'react';
import { render } from 'react-dom';
import Link from 'next/link'
import Layout from '~/components/layout'
import fetch from 'isomorphic-fetch';

class LikeButton extends Component {

  tags = new Map();

  constructor(props) {
    super(props);
  }

  tagAdd(tag) {
    if (!this.tags.has(tag.id)) {
      this.tags.set(tag.id, tag)
    }
  }

  static async getInitialProps({ req }) {
    let params = `query{
      articleList(tagId:0){
        id,
          title,
          intro,
          addTime,
          author{
            nickname
          }
        tags{
          id,
            name
        }
      }
    }`.replace(/\s+/g, '')

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
      <div className="widewrapper main">
      <div className="container">
      <div className="row">
      <div className="col-md-8 blog-main">
      {this.props.articleList.map((article, index)=>
        <div key={index} className="col-md-12 col-sm-12">
        <article className="blog-list">
        <header>
        <h3><a href={"/article/"+article.id}>{article.title}</a></h3>

        <div className="meta">
        <i className="fa fa-user"></i> {article.author.nickname}
        <i className="fa fa-calendar"></i> {article.addtime}
        <i className="fa fa-comments"></i>
        <span className="data">
        <a href={"/article/"+article.id+"#comments"}>{article.commentsNum}Comments</a>
        </span>
        </div>
        </header>

        <div className="body">
        {article.intro}
        </div>

        <div className="clearfix">
        {article.tags.map(tag=>{
          this.tagAdd(tag);
          return <a key={tag.id} href={"/tag/"+tag.id}>{tag.name}</a>
        })}

        <a href={"/article/"+article.id} className="btn btn-clean-one">Read more</a>
        </div>
        <hr />
        </article>
        </div>
      )}

      {/*<Pagination /> */}
      </div>
      <aside className="col-md-4 blog-aside">
      <div className="aside-widget">
      <header>
      <h3>Featured Post</h3>
      </header>
      <div className="body">
      <ul className="clean-list">
      <li><a href="">Clean - Responsive HTML5 Template</a></li>
      <li><a href="">Responsive Pricing Table</a></li>
      <li><a href="">Yellow HTML5 Template</a></li>
      <li><a href="">Blackor Responsive Theme</a></li>
      <li><a href="">Portfolio Bootstrap Template</a></li>
      <li><a href="">Clean Slider Template</a></li>
      </ul>
      </div>
      </div>

      <div className="aside-widget">
      <header>
      <h3>Tags</h3>
      </header>
      <div className="body clearfix">
      <ul className="tags">
      { [...this.tags.values()].map(tag=><li key={tag.id}><a href={'/article'+tag.id}>{tag.name}</a></li>) }
      </ul>
      </div>
      </div>
      </aside>
      </div>
      </div>
      </div>
      </Layout>
    )
  }
}


export default LikeButton
