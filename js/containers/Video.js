import React, { Component } from "react"
import { connect } from 'react-redux'
import { getVideo } from "../actions"
import wjs from "wcjs-player"
import config from "../config"
import Breadcrumb from "../components/Breadcrumb"
import { Edit } from "../components/Edit"

class Video extends Component {
  state = {
    edit: true
  }

  constructor(props) {
    super(props)
    this.config = config.load()
    this.props.dispatch(getVideo(this.props.params.videoID))
  }

  componentDidMount() {
    this.player = new wjs("#player").addPlayer({autoplay: !this.state.edit})
    this.player.volume(50)
    this.player.onFirstPlay(() => {
      this.player.aspectRatio("16:9")
    })
  }

  componentWillReceiveProps(newProps) {
    const url = `${this.config.fileserver.url}:${this.config.fileserver.port}/${this.video(newProps).SerieName}/${this.video(newProps).SeasonName}/${this.video(newProps).Name}.${this.video(newProps).Extension}`
    this.player.addPlaylist(encodeURI(url))
  }

  componentWillUnmount() {
    this.player.stop()
  }

  video(newProps = undefined) {
    let ctx = this.props
    if(newProps) {
      ctx = newProps
    }
    return ctx.rootReducer.episodes[ctx.params.videoID] || {}
  }

  get breadcrumb() {
    const video = this.video()
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

  onEdit() {
    this.setState({edit: true})
  }

  onSave() {
    this.setState({edit: false})
  }

  render() {
    const edit = this.state.edit ? <Edit values={this.video()}/> : ''
    return (
      <div className="col-sm-12">
        <Breadcrumb list={this.breadcrumb} onSave={this::this.onSave} onEdit={this::this.onEdit}
                    edit={this.state.edit}/>
        {edit}
        <div className="row">
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