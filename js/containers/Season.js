import React, { Component } from "react"
import { Items } from "../components/Items"
import { getSeason } from "../actions"
import { connect } from 'react-redux'
import Breadcrumb from "../components/Breadcrumb"
import { Edit } from "../components/Edit"
import Header from "../components/Header"

class Season extends Component {
  state = {
    edit: false
  }

  constructor(props) {
    super(props)
    this.props.dispatch(getSeason(this.props.params.seasonID))
  }

  get season() {
    return this.props.store.seasons[this.props.params.seasonID] || {}
  }

  parseTitle(title = "") {
    return title.replace(/[?\s]*/, "")
  }

  get breadcrumb() {
    const season = this.season
    let list = []
    if(season) {
      list = [
        {link_to: "/", title: "Series"},
        {link_to: `/serie/${season.SerieID}`, title: season.SerieName},
        {title: this.parseTitle(season.OriginalName) || this.parseTitle(season.Name)},
      ]
    }
    return list
  }

  onEdit() {
    this.setState({edit: true})
  }

  onSave() {
    this.setState({edit: false})
  }

  onCancel() {
    this.setState({edit: false})
  }

  render() {
    return (
      <div className="col-sm-12">
        <Header breadcrumb={this.breadcrumb} onSave={this::this.onSave} onEdit={this::this.onEdit} onCancel={this::this.onCancel}
                edit={this.state.edit}
                editValues={this.season}/>
        <div className="row">
          <div className="col-sm-12 list">
            <Items link_to="/watch/:ID" list={this.season.Episodes || []} smallPreview={true}/>
          </div>
        </div>
      </div>
    )
  }

}
const con = connect(state => state)(Season)
export { con as Season }