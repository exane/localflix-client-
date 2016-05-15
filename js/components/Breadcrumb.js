import React, { Component } from "react"
import { Link } from 'react-router'
import classNames from "classnames"

export default class Breadcrumb extends Component {
  static propTypes = {
    list: React.PropTypes.array.isRequired,
  }

  render() {
    const items = this.props.list.map((item, index) => {
      let isLastItem = !item.link_to
      let cssClasses = {
        "active": isLastItem
      }
      const link = item.link_to ? <Link to={item.link_to}>{item.title}</Link> : item.title
      return (
        <li key={index} className={classNames(cssClasses)}>
          {link}
        </li>
      )
    })
    return (
      <ol className="breadcrumb">
        {items}
      </ol>
    )
  }
}