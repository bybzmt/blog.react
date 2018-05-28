import React, { Component } from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';

import Link from 'next/link'
import Layout from '~/components/layout'
import AsideFeaturedPost from '~/components/aside/featured_post'
import AsideTags from '~/components/aside/tags'
import Pagination from '~/components/pagination'

class LikeButton extends Component {

  static async getInitialProps({ req }) {
    let params = `query{
      articleList(tagId:0){
        items{
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
        },
        count,
        length,
      }
    }`.replace(/\s+/g, '')
    console.log(params);

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

  tags = new Map();

  constructor(props) {
    super(props);

    this.goPage = this.goPage.bind(this)
  }

  tagAdd(tag) {
    if (!this.tags.has(tag.id)) {
      this.tags.set(tag.id, tag)
    }
  }

  goPage(page) {
    console.log("page:"+page);
  }

  render() {
    return (
      <Layout>
        <div className="widewrapper main">
          <div className="container">
            <div className="row">
              <div className="col-md-8 blog-main">
                {this.props.articleList.items.map(article=>
                <div key={article.id} className="col-md-12 col-sm-12">
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

                <Pagination
                  count={this.props.articleList.count}
                  size={this.props.articleList.length}
                  current={1}
                  fn={this.goPage}
                />
              </div>

              <aside className="col-md-4 blog-aside">
                <AsideFeaturedPost />
                <AsideTags tags={[...this.tags.values()]} />
              </aside>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}


export default LikeButton
