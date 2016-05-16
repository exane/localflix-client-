import React, { Component } from "react"
import { Link } from 'react-router'
import classNames from "classnames"

export default class Breadcrumb extends Component {
  static propTypes = {
    list: React.PropTypes.array.isRequired,
    //onEdit: React.PropTypes.func.isRequired,
    //onSave: React.PropTypes.func.isRequired,
    //edit: React.PropTypes.bool.isRequired,
  }

  get button() {
    const onClick = this.props.edit ? this.props.onSave : this.props.onEdit
    return <div className="btn btn-success" onClick={onClick}>{this.props.edit ? "Save" : "Edit"}</div>
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
      <div className="row">
        <div className="col-sm-11">
          <ol className="breadcrumb">
            {items}
          </ol>
        </div>
        <div className="col-sm-1">
          {this.button}
        </div>
      </div>
    )
  }
}