import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class Pagination extends Component {

  tags = new Map();

  constructor(props) {
    super(props);

    let pageNum = props.num > 0 ? props.num : 10;
    let current = props.current > 0 ? props.current : 1;
    let count = props.count;
    let size = props.size;
    let fn = props.fn;

    let i = current - parseInt(pageNum / 2);
    if (i < 1) {
        i = 1;
    }

    let max = parseInt(count/size) + (count%size>0 ? 1 : 0);
    if (max < 1) {
        max = 1;
    }

    let end = i+(pageNum-1);

    let pages = [];
    if (i != 1) {
      pages.push({
        page:     1,
        fn:       ()=>fn(1),
        active:   1==current,
        disabled: false,
      })
    }
    for (; i <= end; i++) {
      pages.push({
        page:     i,
        fn:       (n=>()=>fn(n))(i),
        active:   i==current,
        disabled: i>max,
      })
    }
    if (end < max) {
      pages.push({
        page:     max,
        fn:       ()=>fn(max),
        active:   max==current,
        disabled: false,
      })
    }

    this.state = {
      previous: current > 1 ? ()=>fn(current-1) : null,
      pages:    pages,
      next:     current < max ? ()=>fn(current+1) : null,
    }
  }

  render() {
    return (
      <nav>
       <ul className="pagination">
          { this.state.previous ? (
              <li>
                  <a onClick={this.state.previous} aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                  </a>
              </li>
            ) : (
              <li className="disabled">
                  <a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
              </li>
              )}

          {this.state.pages.map((page,i)=>{
              if (page.active) {
                  return <li key={i} className="active"><a>{page.page}</a></li>
              } else if(page.disabled) {
                  return <li key={i} className="disabled"><a>{page.page}</a></li>
              }else{
                  return <li key={i}> <a onClick={page.fn}>{page.page}</a></li>
                }
            })}

            {(()=>{
              if (this.state.next) {
                return <li>
                          <a onClick={this.state.next} aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                          </a>
                      </li>
              } else {
                return <li className="disabled">
                          <a aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                      </li>
              }
            })()}
      </ul>
  </nav>
    )}

}

Pagination.propTypes = {
  count:    PropTypes.number.isRequired,
  size:     PropTypes.number.isRequired,
  current:  PropTypes.number.isRequired,
  fn: PropTypes.func.isRequired,
  num: PropTypes.number,
}

export default Pagination
