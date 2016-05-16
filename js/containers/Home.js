import React, { Component } from "react"
import { allSeries } from "../actions"
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Items } from "../components/Items"

class Home extends Component {
  constructor(props) {
    super(props)
    this.props.dispatch(allSeries())
  }

  get series() {
    const l = this.props.rootReducer.series
    return Object.keys(l).map((key) => l[key])
  }

  render() {
    return (
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Series</li>
            </ol>
          </div>
          <Items link_to="/serie/:ID" list={ this.series || [] }/>
        </div>
      </div>
    )
  }
}

const con = connect(state => state)(Home)
export { con as Home }
