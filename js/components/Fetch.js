import React, { Component } from "react"
import Autosuggest from 'react-autosuggest';
import { searchSeries } from "../actions"
import { connect } from 'react-redux';

export default class Fetch extends Component {
  static propTypes = {}

  state = {
    active: true,
    searchVal: "",
    suggestions: []
  }

  onClick() {
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

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return this.props.store.filter(item => {
      return item.Name.toLowerCase().indexOf(inputValue) >= 0
    });
  }

  getSuggestionValue(suggestion) { // when suggestion selected, this function tells
    return suggestion.Name;                 // what should be the value of the input
  }

  renderSuggestion(suggestion) {
    let src = `http://image.tmdb.org/t/p/w185/${suggestion.poster_path}`
    if(!suggestion.poster_path) {
      src = "./assets/default_poster.jpg"
    }
    return (
      <span>
        <img className="image-preview-small" src={src}/>
        <span>{suggestion.Name} ({suggestion.first_air_date})</span>
      </span>
    );
  }

  onChange(event, {newValue}) {
    this.props.dispatch(searchSeries(newValue))
    this.setState({
      searchVal: newValue
    });
  }

  onSuggestionsUpdateRequested({value}) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  get input() {
    if(!this.state.active) return
    return <Autosuggest
      suggestions={this.state.suggestions}
      onSuggestionsUpdateRequested={this::this.onSuggestionsUpdateRequested}
      getSuggestionValue={this::this.getSuggestionValue}
      renderSuggestion={this::this.renderSuggestion}
      inputProps={{
        onChange: this::this.onChange,
        value: this.state.searchVal,
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