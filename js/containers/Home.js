import React, { Component } from "react"
import { allSeries } from "../actions"
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Items } from "../components/Items"
import Breadcrumb from "../components/Breadcrumb"
import { Edit } from "../components/Edit"
import Header from "../components/Header"

class Home extends Component {
  state = {
    edit: false
  }

  constructor(props) {
    super(props)
    this.props.dispatch(allSeries())
  }

  get series() {
    const l = this.props.store.series
    return Object.keys(l).map((key) => l[key])
  }

  get breadcrumb() {
    return [
      { title: "Series" },
    ]
  }

  render() {
    const edit = this.state.edit ? <Edit values={this.series} /> : ''
    return (
      <div className="col-sm-12">
        <Header breadcrumb={this.breadcrumb} />
        <div className="row">
          <Items link_to="/serie/:ID" list={ this.series || [] }/>
        </div>
      </div>
    )
  }
}

const con = connect(state => state)(Home)
export { con as Home }
