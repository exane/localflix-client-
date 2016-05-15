import React, { Component } from "react"
import { connect } from 'react-redux'
import { getVideo } from "../actions"
import wjs from "wcjs-player"
import config from "../config"
import Breadcrumb from "../components/Breadcrumb"

class Video extends Component {
  constructor(props) {
    super(props)
    this.config = config.load()
    this.props.dispatch(getVideo(this.props.params.videoID))
  }

  componentDidMount() {
    this.player = new wjs("#player").addPlayer({autoplay: true})
    this.player.volume(50)
  }

  componentWillReceiveProps(newProps) {
    const url = `${this.config.fileserver.url}:${this.config.fileserver.port}/${newProps.rootReducer.video.SerieName}/${newProps.rootReducer.video.SeasonName}/${newProps.rootReducer.video.Name}.${newProps.rootReducer.video.Extension}`
    this.player.addPlaylist(encodeURI(url))
  }

  componentWillUnmount() {
    this.player.stop()
  }

  get breadcrumb() {
    const video = this.props.rootReducer.video
    let list = []
    if(video.hasOwnProperty('ID')) {
      list = [
        {link_to: "/", title: "Series"},
        {link_to: `/serie/${video.SerieID}`, title: video.SerieOriginalName},
        {link_to: `/season/${video.SeasonID}`, title: video.SeasonOriginalName || video.Name},
        {title: `Episode ${video.EpisodeNumber}: ${video.OriginalName || video.Name}`},
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
          <div className="col-sm-12">
            <div id="player"></div>
          </div>
        </div>
      </div>
    )
  }
}

const con = connect(state => state)(Video)
export { con as Video }