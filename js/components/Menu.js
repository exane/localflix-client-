import React, { Component } from "react"
import classNames from "classnames"
import Fetch from "./Fetch"

export default class Menu extends Component {
  static propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    edit: React.PropTypes.bool.isRequired,
  }

  state = {}

  get editButton() {
    const onClick = this.props.edit ? this.props.onSave : this.props.onEdit
    const text = this.props.edit ? "Save" : "Edit"
    let className = classNames({
      "btn": true,
      "btn-primary": !this.props.edit,
      "btn-success": this.props.edit,
    })
    return this.button(text, className, onClick)
  }

  get cancelButton() {
    if(!this.props.edit) return false
    return this.button("cancel", "btn btn-warning", this.props.onCancel)
  }

  get refetchButton() {
    if(!this.props.edit) return false
    return <Fetch />
  }

  button(text, className, onClick) {
    return <div className={className} onClick={onClick}>{text}</div>
  }

  render() {
    return (
      <div>
        <span className="input-group btn-group-sm pull-left">
          {this.editButton}
          {this.cancelButton}
        </span>
        <span className="input-group btn-group-sm">
          {this.refetchButton}
        </span>
      </div>
    )
  }
}