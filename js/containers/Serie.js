import React, { Component } from "react"
import { getSerie } from "../actions"
import { connect } from 'react-redux'
import { Items } from "../components/Items"
import Breadcrumb from "../components/Breadcrumb"

class Serie extends Component {
  constructor(props) {
    super(props)
    this.props.dispatch(getSerie(this.props.params.serieID))
  }

  get breadcrumb() {
    const serie = this.props.rootReducer.serie
    let list = []
    if(serie.hasOwnProperty('ID')) {
      list = [
        {link_to: "/", title: "Series"},
        {title: serie.OriginalName},
      ]
    }
    return list
  }

  render() {
    return (
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-12">
            <Breadcrumb list={this.breadcrumb} />
          </div>
          <div className="col-sm-12 list">
            <Items link_to="/season/:ID" list={this.props.rootReducer.serie.Seasons || []}/>
          </div>
        </div>
      </div>
    )
  }
}

const con = connect(state => state)(Serie)
export { con as Serie }
