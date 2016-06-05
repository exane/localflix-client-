import React, { Component } from "react"
import { getSerie } from "../actions"
import { connect } from 'react-redux'
import { Items } from "../components/Items"
import Header from "../components/Header"

class Serie extends Component {
  state = {
    edit: false
  }

  constructor(props) {
    super(props)
    this.props.dispatch(getSerie(this.props.params.serieID))
  }

  parseTitle(title = "") {
    return title.replace(/[?\s]*/, "")
  }

  get breadcrumb() {
    const serie = this.serie
    console.log(serie)
    let list = []
    if(serie) {
      list = [
        {link_to: "/", title: "Series"},
        {title: this.parseTitle(serie.OriginalName) || this.parseTitle(serie.Name) || "Unknown"},
      ]
    }
    return list
  }

  get serie() {
    return this.props.store.series[this.props.params.serieID] || {}
  }

  onEdit() {
    this.setState({edit: true})
  }

  onCancel() {
    this.setState({edit: false})
  }

  onSave() {
    this.setState({edit: false})
  }

  render() {
    return (
      <div className="col-sm-12">
        <Header breadcrumb={this.breadcrumb}
                onSave={this::this.onSave}
                onEdit={this::this.onEdit}
                onCancel={this::this.onCancel}
                edit={this.state.edit}
                editValues={this.serie}
        />
        <div className="row">
          <div className="col-sm-12 list">
            <Items editMode={this.state.edit} link_to="/season/:ID" list={this.serie.Seasons || []}/>
          </div>
        </div>
      </div>
    )
  }
}

const con = connect(state => state)(Serie)
export { con as Serie }
