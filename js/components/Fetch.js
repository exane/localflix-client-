import React, { Component } from "react"
import Autocomplete from "react-autocomplete"
import { searchSeries } from "../actions"
import { connect } from 'react-redux';

export default class Fetch extends Component {
  static propTypes = {}

  state = {
    active: true,
    searchVal: ""
  }

  onClick() {
    this.props.dispatch(searchSeries("berserk"))
    this.setState({
      active: !this.state.active
    })
  }

  get button() {
    return (
      <div className="input-group-btn btn-group-sm">
        <button type="button" className="btn btn-default"
                onClick={this::this.onClick}>{this.state.active ? "load" : "refetch"}</button>
      </div>
    )
  }

  get input() {
    if(!this.state.active) return
    console.log(this.props.store);
    //return <input className="form-control input-sm" type="text"/>
    return <Autocomplete
      value={this.state.searchVal}
      onChange={(e, searchVal) => {
        this.setState({searchVal})
      }}
      items={this.props.store}
      renderItem={(item) => {
        return <div>{item.Name}</div>
      }}
    />
  }

  render() {
    return (
      <div className="input-group">
        {this.button}
        {this.input}
      </div>
    )
  }
}

export default connect(state => {
  return {store: state.rootReducer.data}
})(Fetch)