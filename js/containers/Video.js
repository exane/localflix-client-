import React, { Component } from "react"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getVideo, getSeason } from "../actions"
import wjs from "wcjs-player"
import config from "../config"
import Breadcrumb from "../components/Breadcrumb"
import { Edit } from "../components/Edit"
import Header from "../components/Header"

class Video extends Component {
  state = {
    edit: false,
    reload: false,
  }

  constructor(props) {
    super(props)
    this.config = config.load()
  }

  componentDidMount() {
    this.load()
    this.player = new wjs("#player").addPlayer({autoplay: true})
    this.player.volume(50)
    this.player.onFirstPlay(() => {
      this.player.aspectRatio("16:9")
      this.state.edit ? this.player.pause() : ''
      this.player.subTrack(1)
    })
  }

  urlPath(props = this.props) {
    return `${this.config.fileserver.url}:${this.config.fileserver.port}/${this.video(props).SerieName}/${this.video(props).SeasonName}`
  }

  addPreviousButton() {
    const btn = this.player.find(".wcp-prev")
    btn.show()
    btn.off("click")
    btn.on("click", () => this.jumpToRelativeEpisode(-1))
  }

  addNextButton() {
    const btn = this.player.find(".wcp-next")
    btn.show()
    btn.off("click")
    btn.on("click", () => this.jumpToRelativeEpisode(1))
  }

  jumpToRelativeEpisode(number = 1) {
    let self = this
    console.log(self.props.store.seasons[self.props.params.seasonID].Episodes);
    const currentEpisode = self.props.store.episodes[self.props.params.videoID]
    const newEpisode = self.props.store.seasons[self.props.params.seasonID].Episodes.find(e => {
      return (e.Name | 0) == (currentEpisode.Name | 0) + number
    })
    if(!newEpisode) return
    console.log(newEpisode);
    console.log(`/watch/${self.props.params.seasonID}/${newEpisode.ID}`)
    this.props.dispatch(push(`/watch/${self.props.params.seasonID}/${newEpisode.ID}`))
    this.setState({reload: true})
  }

  loadVideo(nextProps = this.props) {
    const url = `${this.urlPath(nextProps)}/${this.video(nextProps).Name}.${this.video(nextProps).Extension}`
    this.player.clearPlaylist()
    this.player.addPlaylist({
      url: encodeURI(url),
      subtitles: this.subtitles(nextProps),
    })
    this.player.play()
    this.addPreviousButton()
    this.addNextButton()
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.reload) {
      this.load(nextProps)
    }
  }

  load(nextProps = this.props) {
    this.setState({reload: false})
    this.props.dispatch(getVideo(nextProps.params.videoID)).then(() => this.loadVideo())
    this.props.dispatch(getSeason(nextProps.params.seasonID))
  }

  componentWillUnmount() {
    this.player.pause()
    this.player.stop()
    this.player.clearPlaylist()
  }

  video(newProps = undefined) {
    let ctx = this.props
    if(newProps) {
      ctx = newProps
    }
    return ctx.store.episodes[ctx.params.videoID] || {}
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

  onCancel() {
    this.setState({edit: false})
  }

  subtitles(props) {
    const video = this.video(props)
    if(!video.Subtitles || !video.Subtitles.length) return {}
    let result = {}
    video.Subtitles.forEach((sub, index) => {
      result[sub.Name] = encodeURI(`${this.urlPath(props)}/${sub.Name}`)
    })
    return result
  }

  render() {
    return (
      <div className="col-sm-12">
        <Header breadcrumb={this.breadcrumb} onSave={this::this.onSave} onEdit={this::this.onEdit} onCancel={this::this.onCancel}
                    edit={this.state.edit}
                editValues={this.video()}/>
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