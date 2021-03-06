import React, { Component } from "react"

export default class Edit extends Component {
  editable(arr) {
    const hide = ["ID", "CreatedAt", "UpdatedAt", "DeletedAt", "Seasons", "Episodes", "Series", "SerieID", "SeasonNumber"]
    const allow = ["Name", "Description", "AirDate", "EpisodeNumber", "OriginalName"]

    return arr.filter((val) => {
      return allow.includes(val)
    })
  }

  render() {
    let values = this.props.values
    let form = this.editable(Object.keys(values)).map((key, index) => {
      let item = values[key]
      return (
        <div key={index} className="col-sm-4">
          <label>
            {key}:
            <textarea className="form-control" defaultValue={item}/>
          </label>
        </div>
      )
    })

    return (
      <div className="row">
        <div className="col-sm-12 form-group">
          {form}
        </div>
      </div>
    )
  }
}