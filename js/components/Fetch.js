import React, { Component } from "react"
import Autocomplete from "react-autocomplete"

export default class Fetch extends Component {
  static propTypes = {}

  state = {
    active: true
  }

  onClick() {
    this.setState({
      active: !this.state.active
    })
  }

  get button() {
    return (
      <div className="input-group-btn btn-group-sm">
        <button type="button" className="btn btn-default" onClick={this::this.onClick}>{this.state.active ? "load" : "refetch"}</button>
      </div>
    )
  }

  get input() {
    if(!this.state.active) return
    return <input className="form-control input-sm" type="text"/>
    //return <Autocomplete/>
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