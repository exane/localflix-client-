import React, { Component } from "react"
import { allSeries } from "../actions"
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Items } from "../components/Items"
import Breadcrumb from "../components/Breadcrumb"
import { Edit } from "../components/Edit"

class Home extends Component {
  state = {
    edit: true
  }

  constructor(props) {
    super(props)
    this.props.dispatch(allSeries())
  }

  get series() {
    const l = this.props.rootReducer.series
    return Object.keys(l).map((key) => l[key])
  }

  get breadcrumb() {
    return [
      {link_to: "/", title: "Series"},
    ]
  }

  onEdit() {
    this.setState({edit: true})
  }

  onSave() {
    this.setState({edit: false})
  }

  render() {
    const edit = this.state.edit ? <Edit values={this.series} /> : ''
    return (
      <div className="col-sm-12">
        <Breadcrumb list={this.breadcrumb} onSave={this::this.onSave} onEdit={this::this.onEdit}
                    edit={this.state.edit}/>
        <div className="row">
          <Items link_to="/serie/:ID" list={ this.series || [] }/>
        </div>
      </div>
    )
  }
}

const con = connect(state => state)(Home)
export { con as Home }
