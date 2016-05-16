import React, { Component } from "react"
import { Items } from "../components/Items"
import { getSeason } from "../actions"
import { connect } from 'react-redux'
import Breadcrumb from "../components/Breadcrumb"

class Season extends Component {
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

  render() {
    return (
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-12">
            <Breadcrumb list={this.breadcrumb}/>
          </div>
        </div>
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