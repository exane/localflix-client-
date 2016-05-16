import React, { Component } from "react"
import { Link } from 'react-router'
import classNames from "classnames"

export class Items extends Component {
  static propTypes = {
    list: React.PropTypes.array.isRequired,
    link_to: React.PropTypes.string.isRequired,
    smallPreview: React.PropTypes.bool,
  }

  parse(string, params = {}) {
    const regex = /[:](\w+)/g
    //let arr = []
    let result = string.replace(regex, (_, m) => {
      //arr.push(m)
      return params[m]
    })
    return result
  }

  render() {
    const list = this.props.list || []
    const items = list.map((item, id) => {
      let src = "./assets/default_poster.jpg"
      if(item.PosterPath) {
        src = `http://image.tmdb.org/t/p/w185/${item.PosterPath}`
      } else if(item.StillPath) {
        src = `http://image.tmdb.org/t/p/w185/${item.StillPath}`
      }
      const cssClasses = {
        'list-item': true,
        'preview': this.props.smallPreview,
        'missing': item.Missing,
      }
      return (
        <div key={id} className={classNames(cssClasses)}>
          <Link to={this.parse(this.props.link_to, item)}>
            <img src={src}/>
          </Link>
        </div>
      )
    })

    return (
      <div className="col-sm-12 list">
        {items}
      </div>
    )
  }
}