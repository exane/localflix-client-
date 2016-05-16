import React, { Component } from "react"
import { Items } from "../components/Items"
import { getSeason } from "../actions"
import { connect } from 'react-redux'
import Breadcrumb from "../components/Breadcrumb"
import { Edit } from "../components/Edit"

class Season extends Component {
  state = {
    edit: true
  }

  constructor(props) {
    super(props)
    this.props.dispatch(getSeason(this.props.params.seasonID))
  }

  get season() {
    return this.props.rootReducer.seasons[this.props.params.seasonID] || {}
  }

  get breadcrumb() {
    const season = this.season
    let list = []
    if(season) {
      list = [
        {link_to: "/", title: "Series"},
        {link_to: `/serie/${season.SerieID}`, title: season.SerieName},
        {title: season.OriginalName || season.Name},
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

  render() {
    const edit = this.state.edit ? <Edit values={this.season} /> : ''
    return (
      <div className="col-sm-12">
        <Breadcrumb list={this.breadcrumb} onSave={this::this.onSave} onEdit={this::this.onEdit}
                    edit={this.state.edit}/>
        {edit}
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