import React, { Component } from "react"
import Breadcrumb from "../components/Breadcrumb"
import Menu from "../components/Menu"
import Edit from "../components/Edit"


export default class Header extends Component {
  static propTypes = {
    breadcrumb: React.PropTypes.array.isRequired,
    onEdit: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    edit: React.PropTypes.bool,
    editValues: React.PropTypes.object,
  }

  get Edit() {
    return this.props.edit ? <Edit values={this.props.editValues}/> : ''
  }

  get Menu() {
    if(this.props.edit === undefined) return false
    return <Menu edit={this.props.edit}
                 onEdit={this.props.onEdit}
                 onSave={this.props.onSave}
                 onCancel={this.props.onCancel}
    />
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <Breadcrumb list={this.props.breadcrumb}/>
        </div>
        <div className="col-sm-12">
          {this.Menu}
        </div>
        <div className="col-sm-12">
          {this.Edit}
        </div>
      </div>
    )
  }
}